import {
  HERO_BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
  HERO_BLOOM_EXTRACT_FRAGMENT_SHADER,
  HERO_BLOOM_UPSAMPLE_FRAGMENT_SHADER,
  HERO_COMPOSITE_FRAGMENT_SHADER,
  HERO_ENVIRONMENT_FRAGMENT_SHADER,
  HERO_FULLSCREEN_VERTEX_SHADER,
  HERO_LENSING_FRAGMENT_SHADER,
  HERO_PARTICLE_FRAGMENT_SHADER,
  HERO_PARTICLE_VERTEX_SHADER,
} from "./shaders";
import type { HeroSystemState } from "./runtime";

export type HeroQualityName = "low" | "medium" | "high" | "ultra";
export type HeroCompositionName = "a" | "b" | "c" | "d";

export interface HeroRenderQuality {
  dprCap: number;
  name: HeroQualityName;
  particleCount: number;
  renderScale: number;
  targetFps: number;
  volumeSteps: number;
}

interface RenderTarget {
  framebuffer: WebGLFramebuffer;
  height: number;
  texture: WebGLTexture;
  width: number;
}

interface SharedStateUniforms {
  center: WebGLUniformLocation;
  density: WebGLUniformLocation;
  flare: WebGLUniformLocation;
  precession: WebGLUniformLocation;
  resolution: WebGLUniformLocation;
  sceneScale: WebGLUniformLocation;
  temperature: WebGLUniformLocation;
  time: WebGLUniformLocation;
  tilt: WebGLUniformLocation;
  turbulence: WebGLUniformLocation;
}

interface EnvironmentUniforms extends SharedStateUniforms {
  quality: WebGLUniformLocation;
  seed: WebGLUniformLocation;
  volumeSteps: WebGLUniformLocation;
}

interface ParticleUniforms extends SharedStateUniforms {
  layerMode: WebGLUniformLocation;
  particleScale: WebGLUniformLocation;
  seed: WebGLUniformLocation;
}

interface LensingUniforms {
  center: WebGLUniformLocation;
  flare: WebGLUniformLocation;
  lensStrength: WebGLUniformLocation;
  precession: WebGLUniformLocation;
  quality: WebGLUniformLocation;
  resolution: WebGLUniformLocation;
  sceneScale: WebGLUniformLocation;
  sceneTexture: WebGLUniformLocation;
  temperature: WebGLUniformLocation;
  time: WebGLUniformLocation;
}

interface BloomExtractUniforms {
  softKnee: WebGLUniformLocation;
  sourceTexture: WebGLUniformLocation;
  threshold: WebGLUniformLocation;
}

interface BloomFilterUniforms {
  sourceTexture: WebGLUniformLocation;
  texelSize: WebGLUniformLocation;
}

interface BloomUpsampleUniforms {
  highTexture: WebGLUniformLocation;
  lowTexelSize: WebGLUniformLocation;
  lowTexture: WebGLUniformLocation;
  scatter: WebGLUniformLocation;
}

interface CompositeUniforms {
  bloomIntensity: WebGLUniformLocation;
  bloomTexture: WebGLUniformLocation;
  exposure: WebGLUniformLocation;
  resolution: WebGLUniformLocation;
  sceneTexture: WebGLUniformLocation;
  time: WebGLUniformLocation;
}

interface ProgramBundle<TUniforms> {
  program: WebGLProgram;
  uniforms: TUniforms;
}

interface DisjointTimerQueryExtension {
  GPU_DISJOINT_EXT: number;
  TIME_ELAPSED_EXT: number;
}

export interface HeroRendererDiagnostics {
  colorTarget: "rgba16f" | "rgba8";
  gpuFrameMs: number | null;
  gpuTiming: "supported" | "unavailable";
  passCount: 7;
  renderer: "forgefield-eventide-webgl2";
}

const HERO_SEED = 20260718;
const HERO_COMPOSITIONS: Record<
  HeroCompositionName,
  { centerX: number; centerY: number; sceneScale: number }
> = {
  a: { centerX: 0.55, centerY: 0.5, sceneScale: 1.22 },
  b: { centerX: 0.7, centerY: 0.49, sceneScale: 1.58 },
  c: { centerX: 0.67, centerY: 0.51, sceneScale: 1.5 },
  d: { centerX: 0.64, centerY: 0.45, sceneScale: 1.5 },
};

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  label: string,
) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error(`WebGL2 could not allocate the ${label} shader.`);
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const reason = gl.getShaderInfoLog(shader) || "unknown shader error";
    gl.deleteShader(shader);
    throw new Error(`${label} shader compilation failed: ${reason}`);
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
  label: string,
) {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    vertexSource,
    `${label} vertex`,
  );
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentSource,
    `${label} fragment`,
  );
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(`WebGL2 could not allocate the ${label} program.`);
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const reason = gl.getProgramInfoLog(program) || "unknown link error";
    gl.deleteProgram(program);
    throw new Error(`${label} program linking failed: ${reason}`);
  }
  return program;
}

function createFullscreenProgram(
  gl: WebGL2RenderingContext,
  fragmentSource: string,
  label: string,
) {
  return createProgram(
    gl,
    HERO_FULLSCREEN_VERTEX_SHADER,
    fragmentSource,
    label,
  );
}

function requireUniform(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
) {
  const location = gl.getUniformLocation(program, name);
  if (location === null) {
    throw new Error(`Hero shader uniform ${name} is unavailable.`);
  }
  return location;
}

function sharedStateUniforms(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
): SharedStateUniforms {
  return {
    center: requireUniform(gl, program, "uCenter"),
    density: requireUniform(gl, program, "uDensity"),
    flare: requireUniform(gl, program, "uFlare"),
    precession: requireUniform(gl, program, "uPrecession"),
    resolution: requireUniform(gl, program, "uResolution"),
    sceneScale: requireUniform(gl, program, "uSceneScale"),
    temperature: requireUniform(gl, program, "uTemperature"),
    time: requireUniform(gl, program, "uTime"),
    tilt: requireUniform(gl, program, "uTilt"),
    turbulence: requireUniform(gl, program, "uTurbulence"),
  };
}

function heroCenter(
  state: HeroSystemState,
  composition: HeroCompositionName,
  horizontalFocalScale = 1,
) {
  const profile = HERO_COMPOSITIONS[composition];
  return {
    x:
      (profile.centerX + state.cameraX * 0.12) *
      horizontalFocalScale,
    y: profile.centerY + state.cameraY * 0.12,
  };
}

function applySharedState(
  gl: WebGL2RenderingContext,
  uniforms: SharedStateUniforms,
  state: HeroSystemState,
  width: number,
  height: number,
  composition: HeroCompositionName,
  horizontalFocalScale: number,
) {
  const center = heroCenter(
    state,
    composition,
    horizontalFocalScale,
  );
  const profile = HERO_COMPOSITIONS[composition];
  gl.uniform2f(uniforms.resolution, width, height);
  gl.uniform2f(uniforms.center, center.x, center.y);
  gl.uniform1f(uniforms.sceneScale, profile.sceneScale);
  gl.uniform1f(uniforms.time, state.time);
  gl.uniform1f(uniforms.precession, state.precession);
  gl.uniform1f(uniforms.tilt, state.tilt);
  gl.uniform1f(uniforms.density, state.density);
  gl.uniform1f(uniforms.flare, state.flare);
  gl.uniform1f(uniforms.turbulence, state.turbulence);
  gl.uniform1f(uniforms.temperature, state.temperature);
}

export class HeroFlowRenderer {
  private cssHeight = 0;
  private cssWidth = 0;
  private readonly diagnosticsValue: HeroRendererDiagnostics;
  private readonly gl: WebGL2RenderingContext;
  private gpuQuery: WebGLQuery | null = null;
  private height = 0;
  private horizontalFocalScale = 1;
  private quality: HeroRenderQuality | null = null;
  private composition: HeroCompositionName;
  private renderedFrames = 0;
  private readonly timerQueryExtension:
    | DisjointTimerQueryExtension
    | null;
  private readonly textureFormat: {
    internalFormat: number;
    sourceType: number;
  };
  private readonly vertexArray: WebGLVertexArrayObject;
  private width = 0;

  private readonly environment: ProgramBundle<EnvironmentUniforms>;
  private readonly particles: ProgramBundle<ParticleUniforms>;
  private readonly lensing: ProgramBundle<LensingUniforms>;
  private readonly bloomExtract: ProgramBundle<BloomExtractUniforms>;
  private readonly bloomDownsample: ProgramBundle<BloomFilterUniforms>;
  private readonly bloomUpsample: ProgramBundle<BloomUpsampleUniforms>;
  private readonly composite: ProgramBundle<CompositeUniforms>;

  private readonly scene: RenderTarget;
  private readonly resolved: RenderTarget;
  private readonly bloomHalf: RenderTarget;
  private readonly bloomQuarter: RenderTarget;
  private readonly bloomResult: RenderTarget;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    composition: HeroCompositionName = "c",
  ) {
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      desynchronized: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      stencil: false,
    });
    if (!gl) {
      throw new Error("WebGL2 is not available for the hero visualization.");
    }
    this.gl = gl;
    this.composition = composition;
    this.timerQueryExtension = gl.getExtension(
      "EXT_disjoint_timer_query_webgl2",
    );

    const supportsFloatColor =
      Boolean(gl.getExtension("EXT_color_buffer_float")) &&
      Boolean(gl.getExtension("OES_texture_float_linear")) &&
      Boolean(gl.getExtension("EXT_float_blend"));
    this.textureFormat = supportsFloatColor
      ? { internalFormat: gl.RGBA16F, sourceType: gl.HALF_FLOAT }
      : { internalFormat: gl.RGBA8, sourceType: gl.UNSIGNED_BYTE };
    this.diagnosticsValue = {
      colorTarget: supportsFloatColor ? "rgba16f" : "rgba8",
      gpuFrameMs: null,
      gpuTiming: this.timerQueryExtension ? "supported" : "unavailable",
      passCount: 7,
      renderer: "forgefield-eventide-webgl2",
    };

    const environmentProgram = createFullscreenProgram(
      gl,
      HERO_ENVIRONMENT_FRAGMENT_SHADER,
      "Forgefield environment",
    );
    this.environment = {
      program: environmentProgram,
      uniforms: {
        ...sharedStateUniforms(gl, environmentProgram),
        quality: requireUniform(gl, environmentProgram, "uQuality"),
        seed: requireUniform(gl, environmentProgram, "uSeed"),
        volumeSteps: requireUniform(gl, environmentProgram, "uVolumeSteps"),
      },
    };

    const particleProgram = createProgram(
      gl,
      HERO_PARTICLE_VERTEX_SHADER,
      HERO_PARTICLE_FRAGMENT_SHADER,
      "Forgefield matter",
    );
    this.particles = {
      program: particleProgram,
      uniforms: {
        ...sharedStateUniforms(gl, particleProgram),
        layerMode: requireUniform(gl, particleProgram, "uLayerMode"),
        particleScale: requireUniform(gl, particleProgram, "uParticleScale"),
        seed: requireUniform(gl, particleProgram, "uSeed"),
      },
    };

    const lensingProgram = createFullscreenProgram(
      gl,
      HERO_LENSING_FRAGMENT_SHADER,
      "Forgefield lensing",
    );
    this.lensing = {
      program: lensingProgram,
      uniforms: {
        center: requireUniform(gl, lensingProgram, "uCenter"),
        flare: requireUniform(gl, lensingProgram, "uFlare"),
        lensStrength: requireUniform(gl, lensingProgram, "uLensStrength"),
        precession: requireUniform(gl, lensingProgram, "uPrecession"),
        quality: requireUniform(gl, lensingProgram, "uQuality"),
        resolution: requireUniform(gl, lensingProgram, "uResolution"),
        sceneScale: requireUniform(gl, lensingProgram, "uSceneScale"),
        sceneTexture: requireUniform(gl, lensingProgram, "uSceneTexture"),
        temperature: requireUniform(gl, lensingProgram, "uTemperature"),
        time: requireUniform(gl, lensingProgram, "uTime"),
      },
    };

    const bloomExtractProgram = createFullscreenProgram(
      gl,
      HERO_BLOOM_EXTRACT_FRAGMENT_SHADER,
      "Forgefield bloom extract",
    );
    this.bloomExtract = {
      program: bloomExtractProgram,
      uniforms: {
        softKnee: requireUniform(gl, bloomExtractProgram, "uSoftKnee"),
        sourceTexture: requireUniform(
          gl,
          bloomExtractProgram,
          "uSourceTexture",
        ),
        threshold: requireUniform(gl, bloomExtractProgram, "uThreshold"),
      },
    };

    const bloomDownsampleProgram = createFullscreenProgram(
      gl,
      HERO_BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
      "Forgefield bloom downsample",
    );
    this.bloomDownsample = {
      program: bloomDownsampleProgram,
      uniforms: {
        sourceTexture: requireUniform(
          gl,
          bloomDownsampleProgram,
          "uSourceTexture",
        ),
        texelSize: requireUniform(
          gl,
          bloomDownsampleProgram,
          "uTexelSize",
        ),
      },
    };

    const bloomUpsampleProgram = createFullscreenProgram(
      gl,
      HERO_BLOOM_UPSAMPLE_FRAGMENT_SHADER,
      "Forgefield bloom upsample",
    );
    this.bloomUpsample = {
      program: bloomUpsampleProgram,
      uniforms: {
        highTexture: requireUniform(
          gl,
          bloomUpsampleProgram,
          "uHighTexture",
        ),
        lowTexelSize: requireUniform(
          gl,
          bloomUpsampleProgram,
          "uLowTexelSize",
        ),
        lowTexture: requireUniform(
          gl,
          bloomUpsampleProgram,
          "uLowTexture",
        ),
        scatter: requireUniform(gl, bloomUpsampleProgram, "uScatter"),
      },
    };

    const compositeProgram = createFullscreenProgram(
      gl,
      HERO_COMPOSITE_FRAGMENT_SHADER,
      "Forgefield composite",
    );
    this.composite = {
      program: compositeProgram,
      uniforms: {
        bloomIntensity: requireUniform(
          gl,
          compositeProgram,
          "uBloomIntensity",
        ),
        bloomTexture: requireUniform(
          gl,
          compositeProgram,
          "uBloomTexture",
        ),
        exposure: requireUniform(gl, compositeProgram, "uExposure"),
        resolution: requireUniform(gl, compositeProgram, "uResolution"),
        sceneTexture: requireUniform(
          gl,
          compositeProgram,
          "uSceneTexture",
        ),
        time: requireUniform(gl, compositeProgram, "uTime"),
      },
    };

    const vertexArray = gl.createVertexArray();
    if (!vertexArray) {
      this.deletePrograms();
      throw new Error("WebGL2 could not allocate the hero vertex array.");
    }
    this.vertexArray = vertexArray;
    this.scene = this.createRenderTarget();
    this.resolved = this.createRenderTarget();
    this.bloomHalf = this.createRenderTarget();
    this.bloomQuarter = this.createRenderTarget();
    this.bloomResult = this.createRenderTarget();

    gl.bindVertexArray(vertexArray);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);
  }

  get diagnostics(): HeroRendererDiagnostics {
    return this.diagnosticsValue;
  }

  resize(
    cssWidth: number,
    cssHeight: number,
    devicePixelRatio: number,
    quality: HeroRenderQuality,
    focalCssWidth = cssWidth,
  ) {
    this.cssWidth = cssWidth;
    this.cssHeight = cssHeight;
    this.horizontalFocalScale = Math.min(
      1,
      Math.max(0.01, focalCssWidth / Math.max(cssWidth, 1)),
    );
    this.quality = quality;
    const scale =
      Math.min(devicePixelRatio, quality.dprCap) * quality.renderScale;
    const width = Math.max(1, Math.round(cssWidth * scale));
    const height = Math.max(1, Math.round(cssHeight * scale));
    if (width === this.width && height === this.height) {
      return;
    }
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.allocateTarget(this.scene, width, height);
    this.allocateTarget(this.resolved, width, height);
    this.allocateTarget(
      this.bloomHalf,
      Math.max(1, Math.floor(width / 2)),
      Math.max(1, Math.floor(height / 2)),
    );
    this.allocateTarget(
      this.bloomQuarter,
      Math.max(1, Math.floor(width / 4)),
      Math.max(1, Math.floor(height / 4)),
    );
    this.allocateTarget(
      this.bloomResult,
      Math.max(1, Math.floor(width / 2)),
      Math.max(1, Math.floor(height / 2)),
    );
  }

  render(state: HeroSystemState) {
    if (!this.quality || this.gl.isContextLost()) {
      return;
    }
    const gl = this.gl;
    this.resolveGpuQuery();
    const shouldMeasureGpu =
      Boolean(this.timerQueryExtension) &&
      this.gpuQuery === null &&
      this.renderedFrames % 60 === 0;
    const frameQuery = shouldMeasureGpu ? gl.createQuery() : null;
    if (frameQuery && this.timerQueryExtension) {
      gl.beginQuery(this.timerQueryExtension.TIME_ELAPSED_EXT, frameQuery);
    }
    const quality = this.quality;
    const qualityFactor =
      quality.name === "ultra"
        ? 1
        : quality.name === "high"
          ? 0.76
          : quality.name === "medium"
            ? 0.48
            : 0.22;
    gl.bindVertexArray(this.vertexArray);

    this.bindTarget(this.scene);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.environment.program);
    applySharedState(
      gl,
      this.environment.uniforms,
      state,
      this.width,
      this.height,
      this.composition,
      this.horizontalFocalScale,
    );
    gl.uniform1i(this.environment.uniforms.volumeSteps, quality.volumeSteps);
    gl.uniform1f(this.environment.uniforms.quality, qualityFactor);
    gl.uniform1ui(this.environment.uniforms.seed, HERO_SEED);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(this.particles.program);
    applySharedState(
      gl,
      this.particles.uniforms,
      state,
      this.width,
      this.height,
      this.composition,
      this.horizontalFocalScale,
    );
    gl.uniform1ui(this.particles.uniforms.seed, HERO_SEED);
    gl.uniform1f(
      this.particles.uniforms.particleScale,
      Math.max(0.82, (1.48 * this.height) / 900),
    );
    gl.uniform1i(this.particles.uniforms.layerMode, 0);
    gl.drawArraysInstanced(
      gl.TRIANGLES,
      0,
      6,
      quality.particleCount,
    );
    gl.uniform1i(this.particles.uniforms.layerMode, 1);
    gl.drawArraysInstanced(
      gl.TRIANGLES,
      0,
      6,
      quality.particleCount,
    );
    gl.disable(gl.BLEND);

    this.bindTarget(this.resolved);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.lensing.program);
    const center = heroCenter(
      state,
      this.composition,
      this.horizontalFocalScale,
    );
    const compositionProfile = HERO_COMPOSITIONS[this.composition];
    gl.uniform2f(this.lensing.uniforms.resolution, this.width, this.height);
    gl.uniform2f(this.lensing.uniforms.center, center.x, center.y);
    gl.uniform1f(
      this.lensing.uniforms.sceneScale,
      compositionProfile.sceneScale,
    );
    gl.uniform1f(this.lensing.uniforms.time, state.time);
    gl.uniform1f(this.lensing.uniforms.precession, state.precession);
    gl.uniform1f(this.lensing.uniforms.flare, state.flare);
    gl.uniform1f(this.lensing.uniforms.temperature, state.temperature);
    gl.uniform1f(this.lensing.uniforms.lensStrength, state.lensStrength);
    gl.uniform1f(this.lensing.uniforms.quality, qualityFactor);
    this.bindTexture(0, this.scene.texture);
    gl.uniform1i(this.lensing.uniforms.sceneTexture, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.bindTarget(this.bloomHalf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.bloomExtract.program);
    this.bindTexture(0, this.resolved.texture);
    gl.uniform1i(this.bloomExtract.uniforms.sourceTexture, 0);
    gl.uniform1f(this.bloomExtract.uniforms.threshold, 0.72);
    gl.uniform1f(this.bloomExtract.uniforms.softKnee, 0.48);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.bindTarget(this.bloomQuarter);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.bloomDownsample.program);
    this.bindTexture(0, this.bloomHalf.texture);
    gl.uniform1i(this.bloomDownsample.uniforms.sourceTexture, 0);
    gl.uniform2f(
      this.bloomDownsample.uniforms.texelSize,
      1 / this.bloomHalf.width,
      1 / this.bloomHalf.height,
    );
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.bindTarget(this.bloomResult);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.bloomUpsample.program);
    this.bindTexture(0, this.bloomQuarter.texture);
    this.bindTexture(1, this.bloomHalf.texture);
    gl.uniform1i(this.bloomUpsample.uniforms.lowTexture, 0);
    gl.uniform1i(this.bloomUpsample.uniforms.highTexture, 1);
    gl.uniform2f(
      this.bloomUpsample.uniforms.lowTexelSize,
      1 / this.bloomQuarter.width,
      1 / this.bloomQuarter.height,
    );
    gl.uniform1f(this.bloomUpsample.uniforms.scatter, 0.64);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.composite.program);
    this.bindTexture(0, this.resolved.texture);
    this.bindTexture(1, this.bloomResult.texture);
    gl.uniform1i(this.composite.uniforms.sceneTexture, 0);
    gl.uniform1i(this.composite.uniforms.bloomTexture, 1);
    gl.uniform2f(this.composite.uniforms.resolution, this.width, this.height);
    gl.uniform1f(this.composite.uniforms.time, state.time);
    gl.uniform1f(this.composite.uniforms.exposure, -0.12);
    gl.uniform1f(
      this.composite.uniforms.bloomIntensity,
      0.13 + qualityFactor * 0.075,
    );
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (frameQuery && this.timerQueryExtension) {
      gl.endQuery(this.timerQueryExtension.TIME_ELAPSED_EXT);
      this.gpuQuery = frameQuery;
    }
    this.renderedFrames += 1;
  }

  setQuality(quality: HeroRenderQuality, devicePixelRatio: number) {
    this.resize(
      this.cssWidth,
      this.cssHeight,
      devicePixelRatio,
      quality,
      this.cssWidth * this.horizontalFocalScale,
    );
  }

  setComposition(composition: HeroCompositionName) {
    this.composition = composition;
  }

  dispose() {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindVertexArray(null);
    for (const target of [
      this.scene,
      this.resolved,
      this.bloomHalf,
      this.bloomQuarter,
      this.bloomResult,
    ]) {
      gl.deleteFramebuffer(target.framebuffer);
      gl.deleteTexture(target.texture);
    }
    if (this.gpuQuery) {
      gl.deleteQuery(this.gpuQuery);
      this.gpuQuery = null;
    }
    gl.deleteVertexArray(this.vertexArray);
    this.deletePrograms();
  }

  private resolveGpuQuery() {
    const extension = this.timerQueryExtension;
    const query = this.gpuQuery;
    if (!extension || !query) {
      return;
    }
    const available = this.gl.getQueryParameter(
      query,
      this.gl.QUERY_RESULT_AVAILABLE,
    ) as boolean;
    if (!available) {
      return;
    }
    const disjoint = this.gl.getParameter(extension.GPU_DISJOINT_EXT) as boolean;
    if (!disjoint) {
      const elapsedNanoseconds = this.gl.getQueryParameter(
        query,
        this.gl.QUERY_RESULT,
      ) as number;
      this.diagnosticsValue.gpuFrameMs = elapsedNanoseconds / 1_000_000;
    }
    this.gl.deleteQuery(query);
    this.gpuQuery = null;
  }

  private createRenderTarget(): RenderTarget {
    const texture = this.gl.createTexture();
    const framebuffer = this.gl.createFramebuffer();
    if (!texture || !framebuffer) {
      if (texture) this.gl.deleteTexture(texture);
      if (framebuffer) this.gl.deleteFramebuffer(framebuffer);
      throw new Error("WebGL2 could not allocate a Forgefield render target.");
    }
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE,
    );
    return { framebuffer, height: 0, texture, width: 0 };
  }

  private allocateTarget(target: RenderTarget, width: number, height: number) {
    const gl = this.gl;
    target.width = width;
    target.height = height;
    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      this.textureFormat.internalFormat,
      width,
      height,
      0,
      gl.RGBA,
      this.textureFormat.sourceType,
      null,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      target.texture,
      0,
    );
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Forgefield framebuffer is incomplete (${status}).`);
    }
  }

  private bindTarget(target: RenderTarget) {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, target.framebuffer);
    this.gl.viewport(0, 0, target.width, target.height);
  }

  private bindTexture(unit: number, texture: WebGLTexture) {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  }

  private deletePrograms() {
    const gl = this.gl;
    for (const bundle of [
      this.environment,
      this.particles,
      this.lensing,
      this.bloomExtract,
      this.bloomDownsample,
      this.bloomUpsample,
      this.composite,
    ]) {
      if (bundle?.program) {
        gl.deleteProgram(bundle.program);
      }
    }
  }
}
