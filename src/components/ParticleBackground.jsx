import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const smokeCanvasRef = useRef(null);
  const dustCanvasRef = useRef(null);

  useEffect(() => {
    let idleId = null;
    let timeoutId = null;

    const generateSmoke = () => {
      const smokeCanvas = smokeCanvasRef.current;
      if (!smokeCanvas) return;

      const isMobile = window.innerWidth < 640;
      const w = isMobile ? 512 : 1024;
      const h = isMobile ? 256 : 512;

      smokeCanvas.width = w;
      smokeCanvas.height = h;

      const ctx = smokeCanvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#050608';
      ctx.fillRect(0, 0, w, h);

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = p[i];
        p[i] = p[j];
        p[j] = temp;
      }
      const perm = new Uint8Array(512);
      for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

      const grad2 = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1]
      ];

      const dot = (g, x, y) => g[0] * x + g[1] * y;
      const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);

      const noise = (x, y) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const u = fade(xf);
        const v = fade(yf);

        const gi00 = perm[X + perm[Y]] % 8;
        const gi01 = perm[X + perm[Y + 1]] % 8;
        const gi10 = perm[X + 1 + perm[Y]] % 8;
        const gi11 = perm[X + 1 + perm[Y + 1]] % 8;

        const n00 = dot(grad2[gi00], xf, yf);
        const n10 = dot(grad2[gi10], xf - 1, yf);
        const n01 = dot(grad2[gi01], xf, yf - 1);
        const n11 = dot(grad2[gi11], xf - 1, yf - 1);

        const nx0 = n00 + u * (n10 - n00);
        const nx1 = n01 + u * (n11 - n01);
        return nx0 + v * (nx1 - nx0);
      };

      const fbm = (x, y) => {
        let val = 0;
        let amp = 0.5;
        let freq = 1.0;
        for (let o = 0; o < 4; o++) {
          val += amp * noise(x * freq, y * freq);
          freq *= 2.05;
          amp *= 0.5;
        }
        return val;
      };

      const sx = 0.0035;
      const sy = 0.0035;
      let currentY = 0;

      const stepSlice = (deadline) => {
        const startTime = performance.now();
        while (currentY < h) {
          const y = currentY;
          let idx = y * w * 4;
          for (let x = 0; x < w; x++) {
            const qx = fbm(x * sx, y * sy);
            const qy = fbm((x + 100) * sx, (y + 100) * sy);
            const n = fbm((x + qx * 120) * sx, (y + qy * 120) * sy);

            const norm = Math.min(Math.max((n + 0.4) / 1.4, 0), 1);
            const r = Math.floor(5 + norm * (42 - 5));
            const g = Math.floor(6 + norm * (44 - 6));
            const b = Math.floor(8 + norm * (49 - 8));

            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
            idx += 4;
          }
          currentY++;

          const elapsed = performance.now() - startTime;
          const timeRemaining = deadline && typeof deadline.timeRemaining === 'function' ? deadline.timeRemaining() : 10;
          if (elapsed >= 8 || timeRemaining < 2) {
            break;
          }
        }

        ctx.putImageData(imgData, 0, 0);

        if (currentY < h) {
          if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(stepSlice, { timeout: 100 });
          } else {
            timeoutId = setTimeout(stepSlice, 1);
          }
        } else {
          if (typeof window !== 'undefined' && window.__TEST_ENV__) {
            window.smokeFinished = true;
          }
        }
      };

      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(stepSlice, { timeout: 100 });
      } else {
        timeoutId = setTimeout(stepSlice, 1);
      }
    };

    generateSmoke();

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let specks = [];
    let isTouch = false;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
        drawFrame();
      } else if (!animId && !document.hidden) {
        animId = requestAnimationFrame(loop);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
    }

    const initSpecks = () => {
      const isMobile = width < 640;
      const count = isMobile ? 70 : 150;
      specks = [];

      for (let i = 0; i < count; i++) {
        specks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.5,
          baseAlpha: Math.random() * 0.55 + 0.15,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18 - 0.04,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initSpecks();

      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const handleMouseMove = (e) => {
      if (isTouch || !isFinePointer || width < 1024) return;
      const cx = width / 2;
      const cy = height / 2;
      mouse.targetX = Math.max(-8, Math.min(8, ((e.clientX - cx) / cx) * 8));
      mouse.targetY = Math.max(-8, Math.min(8, ((e.clientY - cy) / cy) * 8));
    };

    const handleTouch = () => {
      isTouch = true;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && isFinePointer && width >= 1024) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
      } else {
        mouse.x = 0;
        mouse.y = 0;
      }

      ctx.save();
      ctx.translate(mouse.x, mouse.y);

      const buckets = Array.from({ length: 10 }, () => []);

      const len = specks.length;
      for (let i = 0; i < len; i++) {
        const s = specks[i];

        if (!prefersReducedMotion) {
          s.twinklePhase += s.twinkleSpeed;
          s.x += s.vx;
          s.y += s.vy;

          if (s.x < 0) s.x = width;
          else if (s.x > width) s.x = 0;

          if (s.y < 0) s.y = height;
          else if (s.y > height) s.y = 0;
        }

        const alphaFactor = prefersReducedMotion
          ? s.baseAlpha
          : Math.max(0.15, Math.min(0.7, s.baseAlpha + Math.sin(s.twinklePhase) * 0.2));

        const bucketIdx = Math.min(9, Math.floor(alphaFactor * 10));
        buckets[bucketIdx].push(s);
      }

      for (let b = 0; b < 10; b++) {
        const group = buckets[b];
        if (group.length === 0) continue;

        const a = ((b + 0.5) / 10).toFixed(2);
        ctx.fillStyle = `rgba(240, 246, 255, ${a})`;
        ctx.beginPath();
        for (let i = 0; i < group.length; i++) {
          const s = group[i];
          ctx.moveTo(s.x + s.radius, s.y);
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      ctx.restore();
    };

    const loop = () => {
      drawFrame();
      animId = requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else if (!prefersReducedMotion && !animId) {
        animId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={smokeCanvasRef}
        className="smoke-canvas"
        aria-hidden="true"
      />
      <canvas
        ref={dustCanvasRef}
        className="dust-canvas"
        aria-hidden="true"
      />
    </>
  );
}
