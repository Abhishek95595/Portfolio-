import React, { useEffect, useRef, useState } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [smokeUrl, setSmokeUrl] = useState('');

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const w = isMobile ? 256 : 1024;
    const h = isMobile ? 128 : 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    if (ctx) {
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
        for (let o = 0; o < 3; o++) {
          val += amp * noise(x * freq, y * freq);
          freq *= 2.05;
          amp *= 0.5;
        }
        return val;
      };

      let idx = 0;
      const sx = 0.0035;
      const sy = 0.0035;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const qx = fbm(x * sx, y * sy);
          const qy = fbm((x + 100) * sx, (y + 100) * sy);
          const n = fbm((x + qx * 120) * sx, (y + qy * 120) * sy);

          const norm = Math.min(Math.max((n + 0.4) / 1.4, 0), 1);
          const lum = Math.floor(5 + norm * (38 - 5));

          data[idx] = lum;
          data[idx + 1] = lum + 2;
          data[idx + 2] = lum + 4;
          data[idx + 3] = 255;
          idx += 4;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setSmokeUrl(canvas.toDataURL('image/png'));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
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
      const isMobile = width < 768;
      const count = isMobile ? 40 : 140;
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

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initSpecks();

      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const handleMouseMove = (e) => {
      if (isTouch || width < 768) return;
      const cx = width / 2;
      const cy = height / 2;
      mouse.targetX = ((e.clientX - cx) / cx) * 6;
      mouse.targetY = ((e.clientY - cy) / cy) * 6;
    };

    const handleTouch = () => {
      isTouch = true;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && width >= 768) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
      } else {
        mouse.x = 0;
        mouse.y = 0;
      }

      ctx.save();
      ctx.translate(mouse.x, mouse.y);

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
          : Math.max(0.1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.2);

        ctx.fillStyle = `rgba(240, 246, 255, ${alphaFactor})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
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
        mediaQuery.addListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <>
      <div className="smoke-layer-container" aria-hidden="true">
        {smokeUrl && <img src={smokeUrl} className="smoke-layer-img" alt="" />}
      </div>
      <canvas
        ref={canvasRef}
        className="dust-canvas"
        aria-hidden="true"
      />
    </>
  );
}
