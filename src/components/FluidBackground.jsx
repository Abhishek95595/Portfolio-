import React, { useEffect, useRef } from 'react';

/**
 * FluidBackground Component — Refined Living Vector-Field Environment
 * 
 * Production-quality GPU-friendly fluid simulation:
 * - Multi-scale curl vector field (large calm laminar currents + medium directional eddies + microscopic turbulence)
 * - Natural spatial composition: varied density, soft streams, negative space around focal content
 * - Physical cursor disturbance: gentle localized tangential deflection & velocity wake, smooth decay (no explosions)
 * - Multi-layer visual depth: faint deep particles, midground drift, rare luminous teal accents
 * - Restrained palette: #050505/#07090e base, with strictly controlled #00A38E, #08B7A2, #00796B
 * - Hero section readability preserved with soft focal attenuation
 * - Zero external libraries, uninhibited pointer events, full accessibility (prefers-reduced-motion)
 * - Complete 2D Canvas fallback and full WebGL memory disposal
 */

export default function FluidBackground({
  className = '',
  desktopParticles = 650,
  laptopParticles = 460,
  mobileParticles = 200,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = null;
    let isDisposed = false;

    // Check prefers-reduced-motion
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionMediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    if (motionMediaQuery.addEventListener) {
      motionMediaQuery.addEventListener('change', handleMotionChange);
    } else if (motionMediaQuery.addListener) {
      motionMediaQuery.addListener(handleMotionChange);
    }

    // Determine particle count based on screen width
    const getParticleCount = (w) => {
      if (w < 640) return mobileParticles;
      if (w < 1100) return laptopParticles;
      return desktopParticles;
    };

    // Viewport & DPR tracking (capped at 1.75 to balance sharpness and power)
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    // Pointer dynamics with smooth damping and velocity wake
    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
      lastMoveTime: 0,
    };

    const handlePointerMove = (e) => {
      const px = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : -9999);
      const py = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : -9999);

      if (px === -9999) return;

      const now = performance.now();
      const dt = Math.max(16, now - pointer.lastMoveTime);
      pointer.lastMoveTime = now;

      if (!pointer.active) {
        pointer.prevX = px;
        pointer.prevY = py;
        pointer.active = true;
      }

      const dx = px - pointer.prevX;
      const dy = py - pointer.prevY;
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      pointer.x = px;
      pointer.y = py;

      // Filtered velocity & speed (clamped for physical gentleness)
      const instantVx = (dx / dt) * 16.6;
      const instantVy = (dy / dt) * 16.6;
      pointer.vx = pointer.vx * 0.7 + instantVx * 0.3;
      pointer.vy = pointer.vy * 0.7 + instantVy * 0.3;
      pointer.speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.speed = 0;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchend', handlePointerLeave, { passive: true });

    // Multi-scale divergence-free curl potential field:
    // u = dPsi/dy, v = -dPsi/dx
    // 3 scales of motion:
    // 1. Broad macroscopic laminar ocean currents (slow evolving)
    // 2. Medium meandering streamline channels
    // 3. Subtle microscopic turbulence
    const getCurlVelocity = (px, py, t) => {
      // Scale 1: Broad fluid bodies
      const s1 = 0.00065;
      // Scale 2: Medium directional flow channels
      const s2 = 0.0016;
      // Scale 3: Fine turbulence
      const s3 = 0.0038;

      // Slow temporal evolution
      const t1 = t * 0.16;
      const t2 = t * 0.22;
      const t3 = t * 0.30;

      // Multi-scale scalar potential psi(x, y, t)
      const psi =
        Math.sin(px * s1 + t1) * Math.cos(py * s1 + t1 * 0.8) * 2.2 +
        Math.sin(px * s2 * 1.2 - t2 + py * s2 * 0.7) * 0.95 +
        Math.cos(py * s2 + t2 * 0.6) * Math.sin((px + py) * s2 * 0.6) * 0.85 +
        Math.sin(px * s3 + t3) * Math.cos(py * s3 - t3) * 0.25;

      // Finite difference derivatives for exact curl
      const eps = 4.0;
      const psiY =
        Math.sin(px * s1 + t1) * Math.cos((py + eps) * s1 + t1 * 0.8) * 2.2 +
        Math.sin(px * s2 * 1.2 - t2 + (py + eps) * s2 * 0.7) * 0.95 +
        Math.cos((py + eps) * s2 + t2 * 0.6) * Math.sin((px + py + eps) * s2 * 0.6) * 0.85 +
        Math.sin(px * s3 + t3) * Math.cos((py + eps) * s3 - t3) * 0.25;

      const psiX =
        Math.sin((px + eps) * s1 + t1) * Math.cos(py * s1 + t1 * 0.8) * 2.2 +
        Math.sin((px + eps) * s2 * 1.2 - t2 + py * s2 * 0.7) * 0.95 +
        Math.cos(py * s2 + t2 * 0.6) * Math.sin((px + eps + py) * s2 * 0.6) * 0.85 +
        Math.sin((px + eps) * s3 + t3) * Math.cos(py * s3 - t3) * 0.25;

      // dPsi/dy and -dPsi/dx
      let u = (psiY - psi) / eps * 24.0;
      let v = -(psiX - psi) / eps * 24.0;

      // Gentle global drift
      u += 0.12;
      v += 0.05;

      return { u, v };
    };

    // WebGL Context Initialization
    let gl = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }) || canvas.getContext('experimental-webgl');
    } catch {
      gl = null;
    }

    if (gl) {
      // Vertex Shader: Projects particle coordinate to NDC, passes size & color
      const vertexShaderSource = `
        precision highp float;
        attribute vec2 a_position;
        attribute float a_size;
        attribute vec4 a_color;

        uniform vec2 u_resolution;
        varying vec4 v_color;

        void main() {
          vec2 zeroToOne = a_position / u_resolution;
          vec2 zeroToTwo = zeroToOne * 2.0;
          vec2 clipSpace = zeroToTwo - 1.0;

          gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
          gl_PointSize = a_size;
          v_color = a_color;
        }
      `;

      // Fragment Shader: Soft anti-aliased circular particle with subtle Gaussian core
      const fragmentShaderSource = `
        precision highp float;
        varying vec4 v_color;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float distSq = dot(coord, coord);
          if (distSq > 0.25) {
            discard;
          }
          // Smooth falloff from center (0.0) to edge (0.5)
          float alphaFactor = smoothstep(0.25, 0.02, distSq);
          gl_FragColor = vec4(v_color.rgb, v_color.a * alphaFactor);
        }
      `;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn('Shader compile failed: ', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

      let program = null;
      if (vertShader && fragShader) {
        program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.warn('Program link failed: ', gl.getProgramInfoLog(program));
          program = null;
        }
      }

      if (program) {
        gl.useProgram(program);

        const aPositionLoc = gl.getAttribLocation(program, 'a_position');
        const aSizeLoc = gl.getAttribLocation(program, 'a_size');
        const aColorLoc = gl.getAttribLocation(program, 'a_color');
        const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');

        gl.enable(gl.BLEND);
        // Additive blending for subtle luminous particles without washing out dark bg
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        let count = getParticleCount(width);
        const STRIDE = 7; // pos(2) + size(1) + color(4)
        let vboData = new Float32Array(count * STRIDE);

        // Particle internal state with multi-layer depth distribution
        const particles = [];
        const initParticles = (n) => {
          particles.length = 0;
          for (let i = 0; i < n; i++) {
            // Natural spatial composition:
            // Layer 1 (Deep background, 75%): ultra-faint, micro-points (0.6px–1.1px), slow drift
            // Layer 2 (Mid-ground, 21%): visible soft teal (1.2px–1.7px), responsive
            // Layer 3 (Accent energy, 4%): slightly brighter teal node (1.9px–2.4px)
            const tier = Math.random();
            let baseAlpha, size, depthSpeedFactor, depthLayer;

            if (tier < 0.75) {
              baseAlpha = 0.06 + Math.random() * 0.08; // 0.06 – 0.14 max
              size = 0.7 + Math.random() * 0.5;
              depthSpeedFactor = 0.65;
              depthLayer = 0;
            } else if (tier < 0.96) {
              baseAlpha = 0.16 + Math.random() * 0.10; // 0.16 – 0.26
              size = 1.2 + Math.random() * 0.6;
              depthSpeedFactor = 0.95;
              depthLayer = 1;
            } else {
              baseAlpha = 0.28 + Math.random() * 0.12; // 0.28 – 0.40 max (restrained)
              size = 1.8 + Math.random() * 0.6;
              depthSpeedFactor = 1.15;
              depthLayer = 2;
            }

            // Clustered streams vs sparse voids:
            // Bias coordinates slightly towards flowing sine wave bands to create natural density variation
            let initialX = Math.random() * width;
            let initialY = Math.random() * height;
            if (Math.random() < 0.45) {
              const streamBandY = (Math.sin(initialX * 0.002) * 0.25 + 0.5) * height;
              initialY = streamBandY + (Math.random() - 0.5) * height * 0.45;
            }

            particles.push({
              x: initialX,
              y: initialY,
              vx: (Math.random() - 0.5) * 0.2,
              vy: (Math.random() - 0.5) * 0.2,
              size: size * dpr,
              baseSize: size,
              baseAlpha,
              depthSpeedFactor,
              depthLayer,
              activity: 0,
            });
          }
        };

        initParticles(count);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vboData.byteLength, gl.DYNAMIC_DRAW);

        const handleResize = () => {
          width = window.innerWidth;
          height = window.innerHeight;
          dpr = Math.min(window.devicePixelRatio || 1, 1.75);

          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          gl.viewport(0, 0, canvas.width, canvas.height);

          const newCount = getParticleCount(width);
          if (newCount !== count) {
            count = newCount;
            vboData = new Float32Array(count * STRIDE);
            initParticles(count);
          } else {
            for (let i = 0; i < count; i++) {
              particles[i].size = particles[i].baseSize * dpr;
            }
          }
        };

        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });

        let lastTime = performance.now();
        let simTime = 0;

        const renderGL = (now) => {
          if (isDisposed) return;
          animId = requestAnimationFrame(renderGL);

          const deltaSec = Math.min(0.05, (now - lastTime) / 1000);
          lastTime = now;

          if (!prefersReducedMotion) {
            simTime += deltaSec;
          }

          // Pointer interaction parameters
          // Soft disturbance radius and restrained force
          const pActive = pointer.active && (now - pointer.lastMoveTime < 1600);
          const pRadius = width < 640 ? 110 : 160;
          const pRadiusSq = pRadius * pRadius;
          const pSpeedClamped = Math.min(pointer.speed, 18);

          // Clear buffer
          gl.clearColor(0.0, 0.0, 0.0, 0.0);
          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.useProgram(program);
          gl.uniform2f(uResolutionLoc, width, height);

          // Brand color palette:
          // Deep/Normal: #00796B / #00A38E (0.0, 0.55, 0.48)
          // Active/Energy: #08B7A2 (0.031, 0.718, 0.635)
          const cR_norm = 0.0;
          const cG_norm = 0.58;
          const cB_norm = 0.50;

          const cR_act = 0.031;
          const cG_act = 0.718;
          const cB_act = 0.635;

          let vboIdx = 0;

          for (let i = 0; i < count; i++) {
            const p = particles[i];

            if (!prefersReducedMotion) {
              // 1. Fluid curl vector field influence modulated by depth speed factor
              const { u, v } = getCurlVelocity(p.x, p.y, simTime);
              const flowWeight = 0.035 * p.depthSpeedFactor;
              p.vx = p.vx * 0.965 + u * flowWeight;
              p.vy = p.vy * 0.965 + v * flowWeight;

              // 2. Refined cursor disturbance:
              // Particles gently bend around cursor with smooth tangential deflection
              if (pActive) {
                const dx = p.x - pointer.x;
                const dy = p.y - pointer.y;
                const dSq = dx * dx + dy * dy;

                if (dSq < pRadiusSq && dSq > 4.0) {
                  const dist = Math.sqrt(dSq);
                  const normFactor = 1.0 - dist / pRadius;
                  const smoothCurve = normFactor * normFactor; // Quadratic falloff for gentle edge
                  const force = smoothCurve * (0.35 + pSpeedClamped * 0.05);

                  // Tangential deflection (swirl) + subtle outward pressure
                  const nx = dx / dist;
                  const ny = dy / dist;
                  const tx = -ny;
                  const ty = nx;

                  // Directional momentum follow: pointer.vx, pointer.vy gentle wake
                  const wakeX = pointer.vx * 0.025 * smoothCurve;
                  const wakeY = pointer.vy * 0.025 * smoothCurve;

                  p.vx += (nx * 0.35 + tx * 0.45) * force + wakeX;
                  p.vy += (ny * 0.35 + ty * 0.45) * force + wakeY;

                  // Gentle luminescence boost (restrained to avoid sudden bright spots)
                  p.activity = Math.min(1.0, p.activity + smoothCurve * 0.25);
                }
              }

              // Smooth exponential decay of cursor disturbance activity
              p.activity *= 0.95;

              // Advect position
              p.x += p.vx;
              p.y += p.vy;

              // Smooth toroidal wrap bounds with boundary margin
              const margin = 24;
              if (p.x < -margin) p.x = width + margin;
              else if (p.x > width + margin) p.x = -margin;

              if (p.y < -margin) p.y = height + margin;
              else if (p.y > height + margin) p.y = -margin;
            }

            // Readability attenuation:
            // In the hero text quadrant (top-left on desktop: x < 580px, y < 480px),
            // slightly soften particle alpha so text contrast remains optimal
            let readabilityDamp = 1.0;
            if (p.x < 620 && p.y < 500) {
              const rx = p.x / 620;
              const ry = p.y / 500;
              readabilityDamp = 0.65 + 0.35 * Math.max(rx, ry);
            }

            const act = p.activity;
            const r = cR_norm + (cR_act - cR_norm) * act;
            const g = cG_norm + (cG_act - cG_norm) * act;
            const b = cB_norm + (cB_act - cB_norm) * act;

            const currentAlpha = Math.min(0.50, p.baseAlpha * (1.0 + act * 0.8) * readabilityDamp);
            const currentSize = p.size * (1.0 + act * 0.2);

            vboData[vboIdx++] = p.x;
            vboData[vboIdx++] = p.y;
            vboData[vboIdx++] = currentSize;
            vboData[vboIdx++] = r;
            vboData[vboIdx++] = g;
            vboData[vboIdx++] = b;
            vboData[vboIdx++] = currentAlpha;
          }

          // Upload stream to GPU
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, vboData);

          const FSIZE = Float32Array.BYTES_PER_ELEMENT;
          gl.enableVertexAttribArray(aPositionLoc);
          gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, STRIDE * FSIZE, 0);

          gl.enableVertexAttribArray(aSizeLoc);
          gl.vertexAttribPointer(aSizeLoc, 1, gl.FLOAT, false, STRIDE * FSIZE, 2 * FSIZE);

          gl.enableVertexAttribArray(aColorLoc);
          gl.vertexAttribPointer(aColorLoc, 4, gl.FLOAT, false, STRIDE * FSIZE, 3 * FSIZE);

          gl.drawArrays(gl.POINTS, 0, count);
        };

        animId = requestAnimationFrame(renderGL);

        return () => {
          isDisposed = true;
          if (animId) cancelAnimationFrame(animId);
          window.removeEventListener('mousemove', handlePointerMove);
          window.removeEventListener('touchstart', handlePointerMove);
          window.removeEventListener('touchmove', handlePointerMove);
          window.removeEventListener('mouseleave', handlePointerLeave);
          window.removeEventListener('touchend', handlePointerLeave);
          window.removeEventListener('resize', handleResize);
          if (motionMediaQuery.removeEventListener) {
            motionMediaQuery.removeEventListener('change', handleMotionChange);
          } else if (motionMediaQuery.removeListener) {
            motionMediaQuery.removeListener(handleMotionChange);
          }
          if (gl) {
            gl.deleteBuffer(buffer);
            if (vertShader) gl.deleteShader(vertShader);
            if (fragShader) gl.deleteShader(fragShader);
            if (program) gl.deleteProgram(program);
          }
        };
      }
    }

    // ==========================================
    // CANVAS 2D FALLBACK (if WebGL unavailable)
    // ==========================================
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let count2D = Math.floor(getParticleCount(width) * 0.65);
    const particles2D = [];

    const init2D = (n) => {
      particles2D.length = 0;
      for (let i = 0; i < n; i++) {
        const tier = Math.random();
        let baseAlpha, size, depthSpeedFactor;
        if (tier < 0.75) {
          baseAlpha = 0.08 + Math.random() * 0.06;
          size = 0.7 + Math.random() * 0.4;
          depthSpeedFactor = 0.7;
        } else if (tier < 0.96) {
          baseAlpha = 0.16 + Math.random() * 0.08;
          size = 1.1 + Math.random() * 0.4;
          depthSpeedFactor = 0.95;
        } else {
          baseAlpha = 0.26 + Math.random() * 0.10;
          size = 1.6 + Math.random() * 0.5;
          depthSpeedFactor = 1.15;
        }

        particles2D.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size,
          baseAlpha,
          depthSpeedFactor,
          activity: 0,
        });
      }
    };

    const handleResize2D = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newCount = Math.floor(getParticleCount(width) * 0.65);
      if (newCount !== count2D) {
        count2D = newCount;
        init2D(count2D);
      }
    };

    handleResize2D();
    init2D(count2D);
    window.addEventListener('resize', handleResize2D, { passive: true });

    let lastTime2D = performance.now();
    let simTime2D = 0;

    const render2D = (now) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(render2D);

      const deltaSec = Math.min(0.05, (now - lastTime2D) / 1000);
      lastTime2D = now;

      if (!prefersReducedMotion) {
        simTime2D += deltaSec;
      }

      ctx.clearRect(0, 0, width, height);

      const pActive = pointer.active && (now - pointer.lastMoveTime < 1600);
      const pRadius = width < 640 ? 100 : 150;
      const pRadiusSq = pRadius * pRadius;
      const pSpeedClamped = Math.min(pointer.speed, 18);

      for (let i = 0; i < count2D; i++) {
        const p = particles2D[i];

        if (!prefersReducedMotion) {
          const { u, v } = getCurlVelocity(p.x, p.y, simTime2D);
          p.vx = p.vx * 0.965 + u * (0.035 * p.depthSpeedFactor);
          p.vy = p.vy * 0.965 + v * (0.035 * p.depthSpeedFactor);

          if (pActive) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dSq = dx * dx + dy * dy;

            if (dSq < pRadiusSq && dSq > 4.0) {
              const dist = Math.sqrt(dSq);
              const norm = 1.0 - dist / pRadius;
              const smoothCurve = norm * norm;
              const force = smoothCurve * (0.35 + pSpeedClamped * 0.05);
              const nx = dx / dist;
              const ny = dy / dist;
              const tx = -ny;
              const ty = nx;

              p.vx += (nx * 0.35 + tx * 0.45) * force;
              p.vy += (ny * 0.35 + ty * 0.45) * force;
              p.activity = Math.min(1.0, p.activity + smoothCurve * 0.25);
            }
          }

          p.activity *= 0.95;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;

          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        let readabilityDamp = 1.0;
        if (p.x < 620 && p.y < 500) {
          const rx = p.x / 620;
          const ry = p.y / 500;
          readabilityDamp = 0.65 + 0.35 * Math.max(rx, ry);
        }

        const act = p.activity;
        const currentAlpha = Math.min(0.45, p.baseAlpha * (1.0 + act * 0.8) * readabilityDamp);
        const currentSize = p.size * (1.0 + act * 0.2);

        const r = Math.round(0 + (8 - 0) * act);
        const g = Math.round(148 + (183 - 148) * act);
        const b = Math.round(128 + (162 - 128) * act);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render2D);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('resize', handleResize2D);
      if (motionMediaQuery.removeEventListener) {
        motionMediaQuery.removeEventListener('change', handleMotionChange);
      } else if (motionMediaQuery.removeListener) {
        motionMediaQuery.removeListener(handleMotionChange);
      }
    };
  }, [desktopParticles, laptopParticles, mobileParticles]);

  return (
    <div
      ref={containerRef}
      className={`fluid-background-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="fluid-background-canvas" />
      {/* Subtle organic ambient depth luminescence */}
      <div className="fluid-ambient-depth" />
    </div>
  );
}
