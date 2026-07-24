export const HERO_FULLSCREEN_VERTEX_SHADER = `#version 300 es
precision highp float;

const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);

out vec2 vUv;

void main() {
  vec2 position = POSITIONS[gl_VertexID];
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const HERO_ENVIRONMENT_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 outColor;

uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uTime;
uniform float uPrecession;
uniform float uTilt;
uniform float uDensity;
uniform float uFlare;
uniform float uTurbulence;
uniform float uTemperature;
uniform float uSceneScale;
uniform int uVolumeSteps;
uniform float uQuality;
uniform uint uSeed;

#define PI 3.14159265358979323846
#define TAU 6.28318530717958647692
#define MAX_VOLUME_STEPS 64
#define INNER_DISK_RADIUS 0.86
#define OUTER_DISK_RADIUS 7.1

uint hashUint(uint value) {
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return value;
}

float hash01(uint value) {
  return float(hashUint(value) >> 8u) * (1.0 / 16777216.0);
}

uint hashCell(ivec2 cell, uint salt) {
  uint x = uint(cell.x) * 0x8da6b343u;
  uint y = uint(cell.y) * 0xd8163841u;
  return hashUint(x ^ y ^ salt ^ uSeed);
}

float eventideNoise(vec3 position) {
  float first = 0.5 + 0.5 * sin(dot(position, vec3(1.00, 1.31, 0.73)) + 0.4);
  float second = 0.5 + 0.5 * sin(dot(position, vec3(-1.67, 0.91, 1.43)) - 1.2);
  float third = 0.5 + 0.5 * sin(dot(position, vec3(2.41, -1.19, 1.87)) + 2.0);
  float fourth = 0.5 + 0.5 * sin(dot(position, vec3(-3.17, 2.03, 0.59)) - 0.7);
  return first * 0.48 + second * 0.27 + third * 0.17 + fourth * 0.08;
}

vec3 starPalette(float key) {
  vec3 warmIvory = vec3(1.00, 0.86, 0.64);
  vec3 neutralIvory = vec3(1.00, 0.95, 0.84);
  vec3 coolWhite = vec3(0.78, 0.86, 0.92);
  return key < 0.34
    ? mix(warmIvory, neutralIvory, key / 0.34)
    : mix(neutralIvory, coolWhite, (key - 0.34) / 0.66);
}

vec3 starLayer(
  vec2 sphericalUv,
  float longitudeCells,
  float latitudeCells,
  float occupancy,
  uint salt
) {
  vec2 gridPosition = sphericalUv * vec2(longitudeCells, latitudeCells);
  ivec2 cell = ivec2(floor(gridPosition));
  vec2 withinCell = fract(gridPosition);
  uint cellHash = hashCell(cell, salt);
  float exists = step(1.0 - occupancy, hash01(cellHash ^ 0x27d4eb2du));
  vec2 starPosition = vec2(
    hash01(cellHash ^ 0x165667b1u),
    hash01(cellHash ^ 0xd3a2646cu)
  );
  vec2 delta = withinCell - starPosition;
  float distanceToStar = length(delta);
  float radius = mix(0.022, 0.094, pow(hash01(cellHash ^ 0xfd7046c5u), 5.0));
  float antialiasWidth = max(fwidth(distanceToStar), 0.0001);
  float disk = 1.0 - smoothstep(
    radius,
    radius + antialiasWidth * 1.35,
    distanceToStar
  );
  float brightness = mix(0.18, 2.2, pow(hash01(cellHash ^ 0xb55a4f09u), 7.0));
  float twinklePhase = TAU * hash01(cellHash ^ 0x94d049bbu);
  float twinkle = mix(
    0.96,
    1.0,
    0.5 + 0.5 * sin(uTime * 0.08 + twinklePhase)
  );
  return starPalette(hash01(cellHash ^ 0x369dea0fu))
    * disk
    * exists
    * brightness
    * twinkle;
}

vec3 distantEnvironment(vec3 worldRay) {
  vec2 sphericalUv = vec2(
    atan(worldRay.z, worldRay.x) / TAU + 0.5,
    asin(clamp(worldRay.y, -1.0, 1.0)) / PI + 0.5
  );
  vec3 stars = vec3(0.0);
  stars += starLayer(sphericalUv, 1240.0, 620.0, 0.0021, 0x1b56c4e9u);
  stars += starLayer(sphericalUv, 620.0, 310.0, 0.0012, 0xa2c79d31u) * 0.62;
  stars += starLayer(sphericalUv, 260.0, 130.0, 0.0007, 0x63d83595u) * 1.10;

  float galacticBand = exp(-pow(abs(worldRay.y + 0.12 * worldRay.x), 1.35) * 20.0);
  vec3 background = mix(
    vec3(0.0012, 0.0015, 0.0017),
    vec3(0.0034, 0.0023, 0.0018),
    galacticBand * 0.26
  );
  return background * (0.34 + galacticBand * 0.24) + stars * 0.25;
}

bool intersectEllipsoid(
  vec3 rayOrigin,
  vec3 rayDirection,
  vec3 radii,
  out float nearDistance,
  out float farDistance
) {
  vec3 scaledOrigin = rayOrigin / max(radii, vec3(0.01));
  vec3 scaledDirection = rayDirection / max(radii, vec3(0.01));
  float a = dot(scaledDirection, scaledDirection);
  float b = dot(scaledOrigin, scaledDirection);
  float c = dot(scaledOrigin, scaledOrigin) - 1.0;
  float discriminant = b * b - a * c;
  if (discriminant <= 0.0) {
    nearDistance = 0.0;
    farDistance = 0.0;
    return false;
  }
  float root = sqrt(discriminant);
  nearDistance = max((-b - root) / max(a, 0.00000001), 0.0);
  farDistance = max((-b + root) / max(a, 0.00000001), nearDistance);
  return farDistance > nearDistance;
}

float lifecyclePhase() {
  float seedOffset = float(uSeed & 255u) / 2048.0;
  return fract(0.28 + seedOffset + uTime / 421.0);
}

float eventEnvelope(float phase) {
  return smoothstep(0.62, 0.72, phase)
    * (1.0 - smoothstep(0.79, 0.91, phase));
}

float diskDensity(vec3 position, float phase, float eventEnergy) {
  float radius = length(position.xz);
  float radial01 = clamp(
    (radius - INNER_DISK_RADIUS) / (OUTER_DISK_RADIUS - INNER_DISK_RADIUS),
    0.0,
    1.0
  );
  float radialEnvelope = smoothstep(
    INNER_DISK_RADIUS,
    INNER_DISK_RADIUS + 0.34,
    radius
  ) * (1.0 - smoothstep(OUTER_DISK_RADIUS - 0.9, OUTER_DISK_RADIUS, radius));
  float azimuth = atan(position.z, position.x);
  float warp =
    sin(azimuth * 2.0 + radius * 0.42 + uTime * 0.018) * 0.15 +
    sin(azimuth * 5.0 - radius * 0.24 - uTime * 0.011) * 0.055;
  float halfThickness = mix(0.13, 0.82, pow(radial01, 0.72));
  halfThickness *= 1.0 + 0.18 * sin(azimuth * 3.0 + radius * 0.53);
  float warpedHeight = position.y - warp * mix(0.20, 1.0, radial01);
  float vertical = exp(
    -pow(abs(warpedHeight) / max(halfThickness, 0.05), 2.0) * 1.72
  );

  vec3 flowCoordinate = vec3(
    azimuth * 1.75 + log(max(radius, 0.24)) * 2.8 - uTime * 0.020,
    warpedHeight * 1.8,
    radius * 0.62
  );
  float turbulence = eventideNoise(flowCoordinate);
  float spiralA = 0.5 + 0.5 * sin(
    3.0 * azimuth + 2.3 * log(max(radius, 0.28)) - uTime * 0.027
  );
  float spiralB = 0.5 + 0.5 * sin(
    5.0 * azimuth - 0.61 * radius + uTime * 0.015 + 1.7
  );
  float fineFilament = 0.5 + 0.5 * sin(
    11.0 * azimuth + radius * 1.44 - uTime * 0.046 + turbulence * 2.8
  );
  float structure = smoothstep(
    0.30,
    0.82,
    turbulence * 0.48
      + spiralA * 0.25
      + spiralB * 0.17
      + fineFilament * 0.10
  );
  structure = mix(0.10, 1.0, pow(structure, mix(1.1, 1.7, uTurbulence)));

  float shockRadius = mix(1.4, 5.9, smoothstep(0.68, 0.91, phase));
  float shock = exp(-pow((radius - shockRadius) / 0.18, 2.0))
    * eventEnergy
    * uFlare;
  float breath =
    0.92 +
    0.08 *
      sin(uTime * 0.013 + 0.7) *
      sin(uTime * 0.0079 - 1.1);
  float regeneration = 1.0 - 0.18 * smoothstep(0.80, 0.94, phase);
  return radialEnvelope
    * vertical
    * breath
    * regeneration
    * (0.11 + structure * 0.78 + shock * 0.28);
}

vec3 diskTemperature(float radius, float densityValue, float beaming) {
  float heat = pow(
    1.0 - smoothstep(INNER_DISK_RADIUS, OUTER_DISK_RADIUS, radius),
    1.46
  );
  heat = clamp(heat * mix(0.84, 1.10, uTemperature), 0.0, 1.0);
  vec3 deepCopper = vec3(0.105, 0.012, 0.008);
  vec3 copper = vec3(0.68, 0.14, 0.025);
  vec3 moltenGold = vec3(1.02, 0.48, 0.10);
  vec3 ivory = vec3(1.12, 0.96, 0.74);
  vec3 color = mix(deepCopper, copper, smoothstep(0.02, 0.54, heat));
  color = mix(color, moltenGold, smoothstep(0.38, 0.78, heat));
  color = mix(color, ivory, smoothstep(0.72, 1.0, heat));
  return color
    * mix(0.62, 1.42, clamp(beaming, 0.0, 1.0))
    * mix(0.72, 1.12, clamp(densityValue, 0.0, 1.0));
}

vec3 subtlePolarEmission(vec3 rayOrigin, vec3 rayDirection, float eventEnergy) {
  float transverseRate = max(dot(rayDirection.xz, rayDirection.xz), 0.00001);
  float closestDistance = max(
    -dot(rayOrigin.xz, rayDirection.xz) / transverseRate,
    0.0
  );
  vec3 closestPoint = rayOrigin + rayDirection * closestDistance;
  float axialDistance = abs(closestPoint.y);
  float coneRadius = 0.05 + axialDistance * 0.034;
  float radialDistance = length(closestPoint.xz);
  float core = exp(-pow(radialDistance / max(coneRadius, 0.03), 2.0) * 1.8);
  float axialEnvelope =
    smoothstep(0.9, 1.7, axialDistance) *
    (1.0 - smoothstep(5.4, 7.8, axialDistance));
  float knot = 0.68 + 0.32 * sin(axialDistance * 1.1 - uTime * 0.08);
  return vec3(0.86, 0.80, 0.68)
    * core
    * axialEnvelope
    * mix(0.12, 0.22, uQuality)
    * mix(0.7, 1.0, knot)
    * eventEnergy;
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  float aspect = resolution.x / resolution.y;
  vec2 screen = (vUv - uCenter) * 2.0;
  float tangentHalfFov = 0.73 / max(uSceneScale, 0.8);
  vec3 rayOrigin = vec3(
    sin(uPrecession * 0.46) * 0.55,
    2.32 + mix(-0.18, 0.28, clamp(uTilt, 0.0, 1.0)),
    9.8
  );
  vec3 forward = normalize(-rayOrigin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = normalize(cross(right, forward));
  vec3 rayDirection = normalize(
    forward +
    right * screen.x * aspect * tangentHalfFov +
    up * screen.y * tangentHalfFov
  );

  vec3 environment = distantEnvironment(rayDirection);
  float nearDistance;
  float farDistance;
  bool intersectsDisk = intersectEllipsoid(
    rayOrigin,
    rayDirection,
    vec3(7.35, 1.58, 7.35),
    nearDistance,
    farDistance
  );
  int stepCount = clamp(uVolumeSteps, 10, MAX_VOLUME_STEPS);
  float stepLength = intersectsDisk
    ? (farDistance - nearDistance) / float(stepCount)
    : 0.0;
  uint pixelSeed =
    hashUint(uint(gl_FragCoord.x) * 0x8da6b343u ^
    uint(gl_FragCoord.y) * 0xd8163841u ^
    uSeed);
  float stableJitter = mix(0.18, 0.82, hash01(pixelSeed));
  float distanceAlongRay = nearDistance + stableJitter * stepLength;
  float transmittance = 1.0;
  vec3 accumulated = vec3(0.0);
  float phase = lifecyclePhase();
  float eventEnergy = eventEnvelope(phase);

  for (int step = 0; step < MAX_VOLUME_STEPS; step++) {
    if (!intersectsDisk || step >= stepCount || transmittance < 0.018) {
      break;
    }
    vec3 position = rayOrigin + rayDirection * distanceAlongRay;
    float radius = length(position.xz);
    float densityValue = diskDensity(position, phase, eventEnergy)
      * mix(0.62, 1.12, uDensity);
    vec2 radial = position.xz / max(radius, 0.00001);
    vec2 tangent = vec2(-radial.y, radial.x);
    float beaming = 0.5 + 0.5 * dot(tangent, -rayDirection.xz);
    float radialEnergy = mix(
      0.08,
      1.0,
      pow(
        1.0 - smoothstep(INNER_DISK_RADIUS, OUTER_DISK_RADIUS, radius),
        1.24
      )
    );
    vec3 emission = diskTemperature(radius, densityValue, beaming)
      * densityValue
      * radialEnergy
      * mix(0.46, 0.72, uQuality);
    float extinction = densityValue * 0.62;
    accumulated += transmittance * emission * stepLength;
    transmittance *= exp(-extinction * stepLength);
    distanceAlongRay += stepLength;
  }

  accumulated += subtlePolarEmission(rayOrigin, rayDirection, eventEnergy)
    * mix(transmittance, 1.0, 0.64);
  outColor = vec4(max(environment * transmittance + accumulated, 0.0), 1.0);
}
`;

export const HERO_PARTICLE_VERTEX_SHADER = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uTime;
uniform float uPrecession;
uniform float uTilt;
uniform float uDensity;
uniform float uFlare;
uniform float uTurbulence;
uniform float uTemperature;
uniform float uSceneScale;
uniform uint uSeed;
uniform int uLayerMode;
uniform float uParticleScale;

out vec2 vLocal;
out vec3 vColor;
out float vEnergy;
flat out int vClass;

#define PI 3.14159265358979323846
#define TAU 6.28318530717958647692

uint hashUint(uint value) {
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return value;
}

float random01(inout uint state) {
  state = hashUint(state + 0x9e3779b9u);
  return float(state >> 8u) * (1.0 / 16777216.0);
}

float gaussian(inout uint state) {
  float u0 = max(random01(state), 0.0000001);
  float u1 = random01(state);
  return sqrt(-2.0 * log(u0)) * cos(TAU * u1);
}

vec3 classColor(int particleClass, float heat) {
  vec3 deepCopper = vec3(0.13, 0.012, 0.008);
  vec3 copper = vec3(0.82, 0.18, 0.034);
  vec3 gold = vec3(1.02, 0.55, 0.15);
  vec3 ivory = vec3(1.13, 0.98, 0.79);
  if (particleClass == 2) {
    return mix(gold, ivory, 0.54 + heat * 0.38);
  }
  if (particleClass == 1) {
    return mix(copper, gold, 0.34 + heat * 0.38);
  }
  if (particleClass == 3) {
    return mix(vec3(0.62, 0.58, 0.52), ivory, 0.56 + heat * 0.26);
  }
  return mix(deepCopper, copper, 0.18 + heat * 0.28);
}

vec2 projectPoint(
  vec3 point,
  vec3 cameraOrigin,
  vec3 forward,
  vec3 right,
  vec3 up,
  float aspect,
  out float depth
) {
  vec3 relative = point - cameraOrigin;
  depth = dot(relative, forward);
  float safeDepth = max(depth, 0.1);
  vec2 projected = vec2(dot(relative, right), dot(relative, up))
    / (safeDepth * (0.73 / max(uSceneScale, 0.8)));
  projected.x /= aspect;
  return projected + (uCenter - 0.5) * 2.0;
}

void main() {
  uint particleIndex = uint(gl_InstanceID);
  uint state = hashUint(particleIndex ^ hashUint(uSeed + 0xa511e9b3u));
  float outerRadius = 7.05;
  float innerRadius = 0.92;
  float radialSample = pow(random01(state), 1.28);
  float radius = sqrt(mix(
    innerRadius * innerRadius,
    outerRadius * outerRadius,
    radialSample
  ));
  float radial01 = clamp(
    (radius - innerRadius) / (outerRadius - innerRadius),
    0.0,
    1.0
  );
  float phase = TAU * random01(state);
  bool coherentStream = random01(state) < 0.14;
  if (coherentStream) {
    float arm = floor(random01(state) * 3.0);
    phase =
      arm * (TAU / 3.0) +
      0.78 * log(max(radius / innerRadius, 1.0)) +
      gaussian(state) * 0.24;
  }
  int particleClass = 0;
  if (radial01 < 0.19) {
    particleClass = 2;
  } else if (radial01 < 0.58) {
    particleClass = 1;
  }
  if (random01(state) < 0.0012) {
    particleClass = 3;
  }
  bool fragment = random01(state) < 0.00022;
  if (fragment) {
    particleClass = 2;
  }

  float orbitalRate = mix(1.22, 0.14, pow(radial01, 0.64));
  float angle =
    phase +
    uTime * orbitalRate * mix(0.76, 1.08, random01(state)) +
    uPrecession * 0.66;
  float streamWave =
    0.055 * sin(3.0 * angle + 7.0 * log(max(radius / innerRadius, 1.0)));
  radius *= 1.0 + streamWave * (1.0 - 0.55 * radial01);
  float flare = mix(0.42, 1.0, pow(radial01, 0.72));
  float height = gaussian(state) * mix(0.08, 0.72, flare);
  if (coherentStream) {
    height *= 0.62;
  }
  height +=
    sin(angle * 2.0 + radius * 0.52 + uTime * 0.018) *
    mix(0.03, 0.19, radial01) *
    mix(0.72, 1.24, uTurbulence);

  vec3 position = vec3(cos(angle) * radius, height, sin(angle) * radius);
  vec3 nextPosition = vec3(
    cos(angle + orbitalRate * 0.018) * radius,
    height,
    sin(angle + orbitalRate * 0.018) * radius
  );

  vec3 cameraOrigin = vec3(
    sin(uPrecession * 0.46) * 0.55,
    2.32 + mix(-0.18, 0.28, clamp(uTilt, 0.0, 1.0)),
    9.8
  );
  vec3 forward = normalize(-cameraOrigin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = normalize(cross(right, forward));
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float depth;
  float nextDepth;
  vec2 projected = projectPoint(
    position,
    cameraOrigin,
    forward,
    right,
    up,
    aspect,
    depth
  );
  vec2 projectedNext = projectPoint(
    nextPosition,
    cameraOrigin,
    forward,
    right,
    up,
    aspect,
    nextDepth
  );
  vec2 motion = projectedNext - projected;
  vec2 tangent = length(motion) > 0.000001
    ? normalize(motion)
    : vec2(1.0, 0.0);
  vec2 normal = vec2(-tangent.y, tangent.x);

  const vec2 corners[6] = vec2[6](
    vec2(-1.0, -1.0),
    vec2(1.0, -1.0),
    vec2(-1.0, 1.0),
    vec2(-1.0, 1.0),
    vec2(1.0, -1.0),
    vec2(1.0, 1.0)
  );
  vec2 corner = corners[gl_VertexID];
  float randomSize = mix(0.70, 1.42, random01(state));
  float classSize = particleClass == 3
    ? 1.35
    : particleClass == 2
      ? 0.82
      : particleClass == 1
        ? 0.96
        : 1.08;
  if (fragment) {
    classSize *= mix(3.6, 5.8, random01(state));
  }
  float perspectiveScale = clamp(8.4 / max(depth, 0.35), 0.44, 2.3);
  float pixelSize =
    uParticleScale *
    randomSize *
    classSize *
    perspectiveScale *
    (uLayerMode == 0 ? 1.65 : 0.74);
  float stretch = uLayerMode == 0
    ? mix(1.4, 4.6, orbitalRate)
    : mix(1.2, 7.8, orbitalRate);
  if (fragment) {
    stretch *= 1.65;
  }
  vec2 pixelOffset =
    tangent * corner.x * pixelSize * stretch +
    normal * corner.y * pixelSize;
  vec2 ndcOffset = pixelOffset * 2.0 / max(uResolution, vec2(1.0));
  gl_Position = vec4(projected + ndcOffset, 0.0, 1.0);

  float heat = pow(1.0 - radial01, 1.55);
  heat = clamp(heat * mix(0.86, 1.12, uTemperature), 0.0, 1.0);
  float filamentWave =
    0.52 +
    0.23 * sin(2.0 * angle - 0.54 * sqrt(radius) + uTime * 0.055) +
    0.15 * sin(5.0 * angle + 0.21 * radius - uTime * 0.035 + 0.7) +
    0.10 * cos(angle - 0.09 * radius + uTime * 0.018);
  filamentWave = clamp(filamentWave, 0.0, 1.0);
  vColor = classColor(particleClass, heat)
    * mix(0.58, 1.34, smoothstep(0.16, 0.92, filamentWave));
  if (coherentStream) {
    vColor *= 1.18;
  }
  float nearFar = smoothstep(0.4, 1.0, depth) * (1.0 - smoothstep(14.0, 20.0, depth));
  vEnergy =
    nearFar *
    mix(0.55, 1.16, uDensity) *
    mix(0.9, 1.0 + 0.22 * pow(1.0 - radial01, 2.0), uFlare) *
    (uLayerMode == 0 ? 0.22 : mix(0.34, 0.94, heat));
  if (particleClass == 0 && uLayerMode == 1 && random01(state) > 0.16) {
    vEnergy = 0.0;
  }
  vLocal = corner;
  vClass = particleClass;
}
`;

export const HERO_PARTICLE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp int;

in vec2 vLocal;
in vec3 vColor;
in float vEnergy;
flat in int vClass;
out vec4 outColor;

uniform int uLayerMode;

void main() {
  float radiusSquared = dot(vLocal, vLocal);
  if (radiusSquared > 1.0 || vEnergy <= 0.0001) {
    discard;
  }
  float halo = exp(-radiusSquared * (uLayerMode == 0 ? 2.1 : 4.2));
  float core = exp(-radiusSquared * (uLayerMode == 0 ? 5.4 : 12.0));
  float classGain = vClass == 2 ? 1.16 : vClass == 1 ? 0.94 : 0.72;
  float energy = (halo * (uLayerMode == 0 ? 0.44 : 0.22) + core)
    * vEnergy
    * classGain;
  outColor = vec4(max(vColor * energy, 0.0), 1.0);
}
`;

export const HERO_LENSING_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSceneTexture;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uTime;
uniform float uLensStrength;
uniform float uFlare;
uniform float uTemperature;
uniform float uPrecession;
uniform float uQuality;
uniform float uSceneScale;

float band(float value, float center, float width) {
  float distanceValue = (value - center) / max(width, 0.00001);
  return exp(-distanceValue * distanceValue);
}

vec3 sampleScene(vec2 uv) {
  return texture(uSceneTexture, clamp(uv, vec2(0.001), vec2(0.999))).rgb;
}

float luminance(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 aspectScale = vec2(aspect, 1.0);
  vec2 lensDelta = (vUv - uCenter) * aspectScale;
  float radius = max(length(lensDelta), 0.00001);
  vec2 radialDirection = lensDelta / radius;

  float lensStrength = clamp(uLensStrength, 0.74, 1.12);
  float sceneScale = max(uSceneScale, 0.8);
  float shadowRadius = mix(0.056, 0.068, lensStrength) * sceneScale;
  float einsteinRadius = max(
    shadowRadius * 1.60,
    mix(0.088, 0.104, lensStrength) * sceneScale
  );
  float softenedRadius = sqrt(
    radius * radius + einsteinRadius * einsteinRadius * 0.055
  );
  float deflection =
    lensStrength * einsteinRadius * einsteinRadius /
    max(softenedRadius, einsteinRadius * 0.18);
  deflection = min(deflection, einsteinRadius * 0.90);
  deflection *= smoothstep(
    shadowRadius * 0.91,
    einsteinRadius * 1.24,
    radius
  );
  vec2 sourceDelta = lensDelta + radialDirection * deflection;
  vec2 sourceUv = uCenter + sourceDelta / aspectScale;
  vec3 lensedScene = sampleScene(sourceUv);

  float angle = atan(radialDirection.y, radialDirection.x);
  float inclination = 0.56 + sin(uPrecession * 0.7) * 0.025;
  float ellipticalRadius = length(vec2(
    lensDelta.x,
    lensDelta.y / inclination
  ));
  float foldCenter = shadowRadius * 1.64;
  float foldWidth = max(einsteinRadius * 0.095, 0.85 / uResolution.y);
  float foldBand = band(ellipticalRadius, foldCenter, foldWidth);
  float upperLower = smoothstep(0.12, 0.42, abs(radialDirection.y));
  upperLower *= 1.0 - smoothstep(0.90, 0.995, abs(radialDirection.y));
  float outsideShadow = smoothstep(
    shadowRadius * 1.015,
    shadowRadius * 1.19,
    radius
  );

  float sourceSide = sign(radialDirection.y + 0.00001);
  vec2 equatorialDelta = vec2(
    lensDelta.x * 1.16,
    sourceSide * shadowRadius * 0.12
  );
  vec2 foldSourceUv = uCenter + equatorialDelta / aspectScale;
  vec2 foldSampleOffset = vec2(0.0, 1.15 / uResolution.y);
  vec3 foldedDisk = 0.5 * (
    sampleScene(foldSourceUv + foldSampleOffset) +
    sampleScene(foldSourceUv - foldSampleOffset)
  );
  float foldedLight = smoothstep(0.012, 0.24, luminance(foldedDisk));
  float foldBeaming = mix(
    0.56,
    1.34,
    smoothstep(-0.86, 0.86, radialDirection.x)
  );
  lensedScene +=
    foldedDisk *
    foldedLight *
    foldBand *
    upperLower *
    outsideShadow *
    foldBeaming *
    mix(0.82, 1.12, uQuality);

  float counterFold = band(
    length(vec2(lensDelta.x, lensDelta.y / 0.52)),
    shadowRadius * 1.25,
    foldWidth * 0.72
  );
  vec3 counterMaterial = sampleScene(
    uCenter +
    vec2(lensDelta.x * 0.88, -sourceSide * shadowRadius * 0.075) /
    aspectScale
  );
  lensedScene +=
    counterMaterial *
    counterFold *
    upperLower *
    outsideShadow *
    smoothstep(0.02, 0.22, luminance(counterMaterial)) *
    0.32;

  float shadowTransmission = smoothstep(
    shadowRadius * 0.82,
    shadowRadius * 1.035,
    radius
  );
  lensedScene *= shadowTransmission;

  float ringRadius = shadowRadius * 1.070;
  float ringWidth = max(
    ringRadius * 0.017,
    max(fwidth(radius) * 1.18, 0.55 / uResolution.y)
  );
  float photonRing = band(radius, ringRadius, ringWidth);
  float secondaryRing =
    band(radius, shadowRadius * 1.132, ringWidth * 1.62) * 0.13;
  float ringAura = band(radius, ringRadius, ringWidth * 4.8) * 0.026;
  float approaching = smoothstep(
    -0.92,
    0.82,
    cos(angle - uPrecession - 0.2)
  );
  float ringTexture =
    0.90 +
    0.10 *
      sin(angle * 11.0 + uTime * 0.047) *
      sin(angle * 4.0 - uTime * 0.023);
  vec3 ringColor = mix(
    vec3(0.70, 0.34, 0.10),
    vec3(1.0, 0.96, 0.84),
    approaching * clamp(uTemperature, 0.0, 1.0) * 0.82
  );
  lensedScene +=
    ringColor *
    (photonRing + secondaryRing + ringAura) *
    mix(0.16, 0.62, approaching) *
    ringTexture *
    (0.38 + uFlare * 0.20);

  outColor = vec4(max(lensedScene, 0.0), 1.0);
}
`;

export const HERO_BLOOM_EXTRACT_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSourceTexture;
uniform float uThreshold;
uniform float uSoftKnee;

void main() {
  vec3 source = min(max(texture(uSourceTexture, vUv).rgb, 0.0), vec3(8.0));
  float brightness = max(source.r, max(source.g, source.b));
  float knee = max(uSoftKnee, 0.00001);
  float soft = clamp(brightness - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee);
  float contribution = max(brightness - uThreshold, soft)
    / max(brightness, 0.00001);
  outColor = vec4(source * contribution, 1.0);
}
`;

export const HERO_BLOOM_DOWNSAMPLE_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSourceTexture;
uniform vec2 uTexelSize;

void main() {
  vec2 offset = uTexelSize;
  vec3 result = texture(uSourceTexture, vUv).rgb * 0.2500;
  result += texture(uSourceTexture, vUv + vec2(offset.x, 0.0)).rgb * 0.1250;
  result += texture(uSourceTexture, vUv - vec2(offset.x, 0.0)).rgb * 0.1250;
  result += texture(uSourceTexture, vUv + vec2(0.0, offset.y)).rgb * 0.1250;
  result += texture(uSourceTexture, vUv - vec2(0.0, offset.y)).rgb * 0.1250;
  result += texture(uSourceTexture, vUv + offset).rgb * 0.0625;
  result += texture(uSourceTexture, vUv - offset).rgb * 0.0625;
  result += texture(uSourceTexture, vUv + vec2(offset.x, -offset.y)).rgb * 0.0625;
  result += texture(uSourceTexture, vUv + vec2(-offset.x, offset.y)).rgb * 0.0625;
  outColor = vec4(max(result, 0.0), 1.0);
}
`;

export const HERO_BLOOM_UPSAMPLE_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uLowTexture;
uniform sampler2D uHighTexture;
uniform vec2 uLowTexelSize;
uniform float uScatter;

void main() {
  vec2 offset = uLowTexelSize;
  vec3 low = texture(uLowTexture, vUv).rgb * 0.2500;
  low += texture(uLowTexture, vUv + vec2(offset.x, 0.0)).rgb * 0.1250;
  low += texture(uLowTexture, vUv - vec2(offset.x, 0.0)).rgb * 0.1250;
  low += texture(uLowTexture, vUv + vec2(0.0, offset.y)).rgb * 0.1250;
  low += texture(uLowTexture, vUv - vec2(0.0, offset.y)).rgb * 0.1250;
  low += texture(uLowTexture, vUv + offset).rgb * 0.0625;
  low += texture(uLowTexture, vUv - offset).rgb * 0.0625;
  low += texture(uLowTexture, vUv + vec2(offset.x, -offset.y)).rgb * 0.0625;
  low += texture(uLowTexture, vUv + vec2(-offset.x, offset.y)).rgb * 0.0625;
  vec3 high = max(texture(uHighTexture, vUv).rgb, 0.0);
  outColor = vec4(high + max(low, 0.0) * clamp(uScatter, 0.0, 1.0), 1.0);
}
`;

export const HERO_COMPOSITE_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSceneTexture;
uniform sampler2D uBloomTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform float uExposure;
uniform float uBloomIntensity;

float interleavedGradientNoise(vec2 pixel, float frame) {
  vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
  return fract(magic.z * fract(dot(pixel + frame, magic.xy)));
}

vec3 acesFitted(vec3 color) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp(
    (color * (a * color + b)) /
    (color * (c * color + d) + e),
    0.0,
    1.0
  );
}

void main() {
  vec3 scene = max(texture(uSceneTexture, vUv).rgb, 0.0);
  vec3 bloom = max(texture(uBloomTexture, vUv).rgb, 0.0);
  vec3 hdr = (scene + bloom * max(uBloomIntensity, 0.0)) * exp2(uExposure);
  vec3 mapped = acesFitted(hdr);
  float luminance = dot(mapped, vec3(0.2126, 0.7152, 0.0722));
  mapped = mix(vec3(luminance), mapped, 0.94);

  vec2 centered = vUv * 2.0 - 1.0;
  float vignette = 1.0 - clamp(dot(centered, centered) * 0.34, 0.0, 1.0) * 0.28;
  mapped *= vignette;
  mapped = max(mapped - 0.006, 0.0) / 0.994;
  float grain = interleavedGradientNoise(
    vUv * max(uResolution, vec2(1.0)),
    floor(uTime * 30.0)
  ) - 0.5;
  mapped *= 1.0 + grain * 0.012;

  float leftProtection = smoothstep(0.12, 0.43, vUv.x);
  float verticalFade =
    smoothstep(0.0, 0.075, vUv.y) *
    smoothstep(0.0, 0.075, 1.0 - vUv.y);
  float rightFade = smoothstep(0.0, 0.042, 1.0 - vUv.x);
  float alpha = leftProtection * verticalFade * rightFade;
  outColor = vec4(clamp(mapped, 0.0, 1.0) * alpha, alpha);
}
`;
