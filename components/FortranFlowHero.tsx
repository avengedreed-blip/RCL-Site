"use client";

import { useEffect, useRef } from "react";
import { HeroSystemField } from "@/components/HeroSystemField";
import type {
  HeroCompositionName,
  HeroFlowRenderer,
  HeroRenderQuality,
} from "@/lib/hero-flow/renderer";
import type { FortranHeroRuntime } from "@/lib/hero-flow/runtime";

const QUALITY_LEVELS: readonly HeroRenderQuality[] = [
  {
    dprCap: 1,
    name: "low",
    particleCount: 12_000,
    renderScale: 0.48,
    targetFps: 30,
    volumeSteps: 18,
  },
  {
    dprCap: 1.15,
    name: "medium",
    particleCount: 24_000,
    renderScale: 0.62,
    targetFps: 40,
    volumeSteps: 28,
  },
  {
    dprCap: 1.35,
    name: "high",
    particleCount: 48_000,
    renderScale: 0.76,
    targetFps: 50,
    volumeSteps: 42,
  },
  {
    dprCap: 1.5,
    name: "ultra",
    particleCount: 72_000,
    renderScale: 0.88,
    targetFps: 60,
    volumeSteps: 58,
  },
];
const MIN_QUALITY_SAMPLES = 120;
const DIAGNOSTIC_UPDATE_INTERVAL = 45;
const MAX_PREFLIGHT_LONG_TASK_MS = 180;
const COMPOSITION_NAMES: readonly HeroCompositionName[] = [
  "a",
  "b",
  "c",
  "d",
];

function responsiveComposition(): HeroCompositionName {
  if (window.innerWidth < 768) {
    return "d";
  }
  if (window.innerWidth < 1024) {
    return "b";
  }
  return "c";
}

function initialQualityIndex() {
  if (window.innerWidth < 768) {
    return 0;
  }
  if (window.innerWidth < 1200) {
    return 1;
  }
  return 2;
}

function isLocalDiagnosticsHost() {
  return (
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
  );
}

function readDiagnosticOverrides() {
  const params = new URLSearchParams(window.location.search);
  const quality = params.get("heroQuality");
  const failure = params.get("heroFailure");
  const requestedComposition = params
    .get("heroComposition")
    ?.toLowerCase() as HeroCompositionName | undefined;
  const forcedQualityIndex = QUALITY_LEVELS.findIndex(
    (entry) => entry.name === quality,
  );
  const requestedTime = Number(params.get("heroTime"));

  return {
    forcedQualityIndex:
      forcedQualityIndex >= 0 ? forcedQualityIndex : undefined,
    forcedFailure:
      failure === "initialization" ? "initialization" : undefined,
    forcedComposition: COMPOSITION_NAMES.includes(
      requestedComposition ?? "c",
    )
      ? requestedComposition
      : undefined,
    forcedStatic: quality === "static",
    forcedTime:
      Number.isFinite(requestedTime) && requestedTime >= 0
        ? Math.min(requestedTime, 3600)
        : undefined,
  };
}

export function FortranFlowHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }
    const diagnosticsEnabled = isLocalDiagnosticsHost();
    const overrides = diagnosticsEnabled
      ? readDiagnosticOverrides()
      : {
          forcedQualityIndex: undefined,
          forcedFailure: undefined,
          forcedComposition: undefined,
          forcedStatic: false,
          forcedTime: undefined,
        };
    const setDevelopmentStage = (stage: string) => {
      if (diagnosticsEnabled) {
        container.dataset.heroInitializationStage = stage;
      }
    };
    setDevelopmentStage("effect-ready");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const useMobileStill =
      window.innerWidth < 768 &&
      overrides.forcedQualityIndex === undefined;
    if (motionQuery.matches || overrides.forcedStatic || useMobileStill) {
      container.dataset.heroMode = "reduced";
      container.dataset.heroQuality = "static";
      if (diagnosticsEnabled) {
        container.dataset.heroActivity = "static";
      }
      setDevelopmentStage(
        overrides.forcedStatic
          ? "forced-static"
          : useMobileStill
            ? "mobile-static"
            : "reduced-motion",
      );
      if (statusRef.current) {
        statusRef.current.textContent = overrides.forcedStatic
          ? "Deterministic renderer still"
          : useMobileStill
            ? "Mobile-optimized renderer still"
            : "Reduced-motion renderer still";
      }
      return;
    }

    let animationFrame = 0;
    let animationEnabled = true;
    let cancelled = false;
    let documentVisible = !document.hidden;
    let heroVisible = true;
    let idleHandle = 0;
    let lastFrame = 0;
    let lastRender = 0;
    let longestPreflightTask = 0;
    let movingFrameInterval = 0;
    let movingRenderCost = 0;
    let qualityIndex =
      overrides.forcedQualityIndex ?? initialQualityIndex();
    let qualitySamples = 0;
    let renderer: HeroFlowRenderer | null = null;
    let runtime: FortranHeroRuntime | null = null;
    const requestIdle = Reflect.get(window, "requestIdleCallback") as
      | ((
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number)
      | undefined;
    const cancelIdle = Reflect.get(window, "cancelIdleCallback") as
      | ((handle: number) => void)
      | undefined;
    const recordLongTasks = (entries: readonly PerformanceEntry[]) => {
      for (const entry of entries) {
        longestPreflightTask = Math.max(
          longestPreflightTask,
          entry.duration,
        );
      }
    };
    const performanceObserver =
      typeof PerformanceObserver !== "undefined" &&
      PerformanceObserver.supportedEntryTypes.includes("longtask")
        ? new PerformanceObserver((list) =>
            recordLongTasks(list.getEntries()),
          )
        : null;
    performanceObserver?.observe({ buffered: true, type: "longtask" });

    const resize = () => {
      if (!renderer) {
        return;
      }
      const composition =
        overrides.forcedComposition ??
        responsiveComposition();
      renderer.setComposition(composition);
      container.dataset.heroComposition = composition;
      const bounds = container.getBoundingClientRect();
      renderer.resize(
        bounds.width,
        bounds.height,
        window.devicePixelRatio || 1,
        QUALITY_LEVELS[qualityIndex],
      );
    };

    const setQuality = (nextIndex: number) => {
      qualityIndex = Math.max(0, Math.min(QUALITY_LEVELS.length - 1, nextIndex));
      const quality = QUALITY_LEVELS[qualityIndex];
      container.dataset.heroQuality = quality.name;
      if (diagnosticsEnabled) {
        container.dataset.heroParticleCount = String(quality.particleCount);
        container.dataset.heroVolumeSteps = String(quality.volumeSteps);
      }
      renderer?.setQuality(
        quality,
        window.devicePixelRatio || 1,
      );
      qualitySamples = 0;
      movingFrameInterval = 0;
      movingRenderCost = 0;
    };

    const measureQuality = (frameInterval: number, renderCost: number) => {
      movingFrameInterval =
        movingFrameInterval === 0
          ? frameInterval
          : movingFrameInterval * 0.94 + frameInterval * 0.06;
      movingRenderCost =
        movingRenderCost === 0
          ? renderCost
          : movingRenderCost * 0.92 + renderCost * 0.08;
      qualitySamples += 1;
      if (
        diagnosticsEnabled &&
        qualitySamples % DIAGNOSTIC_UPDATE_INTERVAL === 0
      ) {
        container.dataset.heroFrameIntervalMs =
          movingFrameInterval.toFixed(2);
        container.dataset.heroCpuSubmitMs = movingRenderCost.toFixed(2);
        container.dataset.heroSimulationTimeSeconds =
          runtime?.state.time.toFixed(2) ?? "0.00";
        container.dataset.heroRenderWidth = String(canvas.width);
        container.dataset.heroRenderHeight = String(canvas.height);
        container.dataset.heroGpuTiming =
          renderer?.diagnostics.gpuTiming ?? "unavailable";
        const measuredGpuFrameMs = renderer?.diagnostics.gpuFrameMs;
        if (measuredGpuFrameMs != null) {
          container.dataset.heroGpuFrameMs =
            measuredGpuFrameMs.toFixed(2);
        }
      }
      if (overrides.forcedQualityIndex !== undefined) {
        return;
      }
      if (qualitySamples < MIN_QUALITY_SAMPLES) {
        return;
      }

      const targetInterval = 1000 / QUALITY_LEVELS[qualityIndex].targetFps;
      const gpuFrameMs = renderer?.diagnostics.gpuFrameMs ?? null;
      if (
        qualityIndex > 0 &&
        (movingFrameInterval > targetInterval * 1.34 ||
          movingRenderCost > targetInterval * 0.72 ||
          (gpuFrameMs !== null && gpuFrameMs > targetInterval * 0.82))
      ) {
        setQuality(qualityIndex - 1);
      } else if (
        qualityIndex < QUALITY_LEVELS.length - 1 &&
        movingFrameInterval < targetInterval * 1.08 &&
        movingRenderCost < targetInterval * 0.38 &&
        (gpuFrameMs === null || gpuFrameMs < targetInterval * 0.5)
      ) {
        setQuality(qualityIndex + 1);
      } else {
        qualitySamples = 0;
      }
    };

    const frame = (timestamp: number) => {
      animationFrame = 0;
      if (cancelled || !animationEnabled) {
        return;
      }

      const frameInterval =
        lastFrame === 0 ? 1000 / 60 : Math.min(timestamp - lastFrame, 100);
      lastFrame = timestamp;
      if (runtime && renderer && documentVisible && heroVisible) {
        const quality = QUALITY_LEVELS[qualityIndex];
        const renderInterval = 1000 / quality.targetFps;
        if (timestamp - lastRender >= renderInterval) {
          const simulationDelta =
            lastRender === 0
              ? renderInterval
              : Math.min(timestamp - lastRender, 100);
          const started = performance.now();
          runtime.advance(simulationDelta / 1000);
          renderer.render(runtime.state);
          measureQuality(frameInterval, performance.now() - started);
          lastRender = timestamp;
        }
      }

      if (documentVisible && heroVisible) {
        animationFrame = window.requestAnimationFrame(frame);
      }
    };

    const updateAnimationState = () => {
      const shouldRun =
        !cancelled && animationEnabled && documentVisible && heroVisible;
      if (diagnosticsEnabled) {
        container.dataset.heroActivity = shouldRun ? "running" : "paused";
      }
      if (shouldRun && animationFrame === 0) {
        lastFrame = performance.now();
        lastRender = lastFrame;
        animationFrame = window.requestAnimationFrame(frame);
      } else if (!shouldRun && animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleVisibilityChange = () => {
      documentVisible = !document.hidden;
      updateAnimationState();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      heroVisible = false;
      animationEnabled = false;
      window.cancelAnimationFrame(animationFrame);
      container.dataset.heroMode = "fallback";
      container.dataset.heroQuality = "static";
      setDevelopmentStage("webgl-context-lost");
      if (diagnosticsEnabled) {
        container.dataset.heroFallbackReason = "WebGL2 context lost";
      }
      if (statusRef.current) {
        statusRef.current.textContent = "Deterministic renderer still";
      }
      updateAnimationState();
    };
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return;
      }
      heroVisible = false;
      animationEnabled = false;
      window.cancelAnimationFrame(animationFrame);
      renderer?.dispose();
      renderer = null;
      runtime = null;
      container.dataset.heroMode = "reduced";
      container.dataset.heroQuality = "static";
      setDevelopmentStage("reduced-motion");
      if (statusRef.current) {
        statusRef.current.textContent = "Reduced-motion renderer still";
      }
      updateAnimationState();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry?.isIntersecting ?? false;
        updateAnimationState();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    motionQuery.addEventListener("change", handleMotionChange);

    const initialize = async () => {
      try {
        recordLongTasks(performanceObserver?.takeRecords() ?? []);
        performanceObserver?.disconnect();
        if (
          overrides.forcedQualityIndex === undefined &&
          longestPreflightTask >= MAX_PREFLIGHT_LONG_TASK_MS
        ) {
          animationEnabled = false;
          window.cancelAnimationFrame(animationFrame);
          container.dataset.heroMode = "fallback";
          container.dataset.heroQuality = "static";
          setDevelopmentStage("performance-fallback");
          if (diagnosticsEnabled) {
            container.dataset.heroFallbackReason =
              `Preflight long task ${longestPreflightTask.toFixed(1)} ms`;
          }
          if (statusRef.current) {
            statusRef.current.textContent = "Performance-aware renderer still";
          }
          updateAnimationState();
          return;
        }
        setDevelopmentStage("loading-modules");
        if (overrides.forcedFailure === "initialization") {
          throw new Error("Forced local initialization failure");
        }
        const [{ FortranHeroRuntime }, { HeroFlowRenderer }] = await Promise.all([
          import("@/lib/hero-flow/runtime"),
          import("@/lib/hero-flow/renderer"),
        ]);
        if (cancelled) {
          return;
        }

        setDevelopmentStage("creating-renderer");
        const composition =
          overrides.forcedComposition ??
          responsiveComposition();
        renderer = new HeroFlowRenderer(canvas, composition);
        container.dataset.heroComposition = composition;
        if (diagnosticsEnabled) {
          container.dataset.heroRenderer = renderer.diagnostics.renderer;
          container.dataset.heroColorTarget =
            renderer.diagnostics.colorTarget;
          container.dataset.heroGpuTiming = renderer.diagnostics.gpuTiming;
          container.dataset.heroPassCount = String(
            renderer.diagnostics.passCount,
          );
          container.dataset.heroShaderStatus = "compiled-and-linked";
        }
        setDevelopmentStage("loading-fortran-wasm");
        runtime = await FortranHeroRuntime.load();
        if (cancelled) {
          renderer.dispose();
          return;
        }

        if (overrides.forcedTime !== undefined) {
          runtime.seek(overrides.forcedTime);
        }
        if (diagnosticsEnabled) {
          container.dataset.heroFortranStatus = "runtime-verified";
        }
        setQuality(qualityIndex);
        resize();
        renderer.render(runtime.state);
        container.dataset.heroMode = "live";
        setDevelopmentStage("live");
        updateAnimationState();
        if (diagnosticsEnabled) {
          Reflect.set(window, "__rclHeroDiagnostics", {
            fortran: "runtime-verified",
            passCount: renderer.diagnostics.passCount,
            renderer: renderer.diagnostics.renderer,
            target: renderer.diagnostics.colorTarget,
            quality: QUALITY_LEVELS[qualityIndex].name,
          });
          console.info("[RCL hero] Forgefield renderer live", {
            fortran: "runtime-verified",
            passCount: renderer.diagnostics.passCount,
            renderer: renderer.diagnostics.renderer,
            target: renderer.diagnostics.colorTarget,
          });
        }
        if (statusRef.current) {
          statusRef.current.textContent = "Forgefield web renderer";
        }
      } catch (error) {
        if (!cancelled) {
          animationEnabled = false;
          window.cancelAnimationFrame(animationFrame);
          container.dataset.heroMode = "fallback";
          container.dataset.heroQuality = "static";
          setDevelopmentStage("fallback");
          if (diagnosticsEnabled) {
            const reason =
              error instanceof Error
                ? error.message
                : "Unknown initialization error";
            container.dataset.heroFallbackReason = reason.slice(0, 240);
            console.error("[RCL hero] initialization failed:", error);
          }
          if (statusRef.current) {
            statusRef.current.textContent = "Deterministic renderer still";
          }
          updateAnimationState();
        }
      }
    };

    if (requestIdle) {
      idleHandle = requestIdle(() => void initialize(), { timeout: 900 });
    } else {
      idleHandle = window.setTimeout(() => void initialize(), 120);
    }
    animationFrame = window.requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      if (cancelIdle && requestIdle) {
        cancelIdle(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      motionQuery.removeEventListener("change", handleMotionChange);
      performanceObserver?.disconnect();
      renderer?.dispose();
      runtime = null;
      renderer = null;
      if (diagnosticsEnabled) {
        Reflect.deleteProperty(window, "__rclHeroDiagnostics");
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fortran-flow-hero material-simulation-plane"
      data-hero-mode="initializing"
      data-hero-quality="adaptive"
    >
      <div className="fortran-flow-hero__visual" aria-hidden="true">
        <HeroSystemField />
        <canvas
          ref={canvasRef}
          className="fortran-flow-hero__canvas"
          role="presentation"
        />
      </div>
      <p className="fortran-flow-hero__caption">
        <span>Simulation field</span>
        <span ref={statusRef}>Initializing numerical field</span>
      </p>
    </div>
  );
}
