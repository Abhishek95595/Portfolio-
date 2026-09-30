import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let isTouch = false;

    const pointer = {
      x: null,
      y: null,
      radius: 160,
    };

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

    const computed = getComputedStyle(document.documentElement);
    const accentCyan = computed.getPropertyValue('--accent-cyan').trim() || '#06b6d4';
    const accentBlue = computed.getPropertyValue('--accent-blue').trim() || '#3b82f6';

    const parseHexToRgb = (hex) => {
      const sanitized = hex.replace('#', '');
      if (sanitized.length === 3) {
        const r = parseInt(sanitized[0] + sanitized[0], 16);
        const g = parseInt(sanitized[1] + sanitized[1], 16);
        const b = parseInt(sanitized[2] + sanitized[2], 16);
        return { r, g, b };
      }
      if (sanitized.length === 6) {
        const r = parseInt(sanitized.slice(0, 2), 16);
        const g = parseInt(sanitized.slice(2, 4), 16);
        const b = parseInt(sanitized.slice(4, 6), 16);
        return { r, g, b };
      }
      return { r: 6, g: 182, b: 212 };
    };

    const rgbCyan = parseHexToRgb(accentCyan);
    const rgbBlue = parseHexToRgb(accentBlue);

    let pulses = [];

    const initParticles = () => {
      const area = width * height;
      const isMobile = width < 768;
      const calculated = Math.floor(area / 24000);
      const targetCount = isMobile
        ? Math.min(Math.max(calculated, 20), 35)
        : Math.min(Math.max(calculated, 35), 65);

      particles = [];
      pulses = [];
      for (let i = 0; i < targetCount; i++) {
        const isCyan = Math.random() > 0.35;
        const color = isCyan ? rgbCyan : rgbBlue;
        const radius = isMobile ? Math.random() * 1.0 + 1.0 : Math.random() * 1.5 + 1.2;
        const speed = isMobile ? 0.35 : 0.55;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius,
          color,
          alpha: Math.random() * 0.4 + 0.3,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();

      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const handlePointerMove = (e) => {
      if (isTouch) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const handlePointerLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    const handleTouchStart = () => {
      isTouch = true;
      pointer.x = null;
      pointer.y = null;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 130;
      const maxDistanceSq = maxDistance * maxDistance;
      const mouseDistSq = pointer.radius * pointer.radius;
      const pLen = particles.length;

      const lineBuckets = { 1: [], 2: [], 3: [] };
      const activeConnections = [];

      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];

        if (!prefersReducedMotion) {
          if (pointer.x !== null && pointer.y !== null && !isTouch) {
            const dxm = pointer.x - p1.x;
            const dym = pointer.y - p1.y;
            const distSqM = dxm * dxm + dym * dym;

            if (distSqM < mouseDistSq && distSqM > 1) {
              const distM = Math.sqrt(distSqM);
              const factor = (1 - distM / pointer.radius) * 0.035;
              p1.vx += (dxm / distM) * factor;
              p1.vy += (dym / distM) * factor;

              lineBuckets[3].push(p1.x, p1.y, pointer.x, pointer.y);
            }
          }

          p1.vx *= 0.99;
          p1.vy *= 0.99;

          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x - p1.radius <= 0) {
            p1.x = p1.radius;
            p1.vx = -p1.vx;
          } else if (p1.x + p1.radius >= width) {
            p1.x = width - p1.radius;
            p1.vx = -p1.vx;
          }

          if (p1.y - p1.radius <= 0) {
            p1.y = p1.radius;
            p1.vy = -p1.vy;
          } else if (p1.y + p1.radius >= height) {
            p1.y = height - p1.radius;
            p1.vy = -p1.vy;
          }
        }

        ctx.fillStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            activeConnections.push({ p1, p2 });
            const ratio = 1 - distSq / maxDistanceSq;
            if (ratio > 0.5) {
              lineBuckets[2].push(p1.x, p1.y, p2.x, p2.y);
            } else {
              lineBuckets[1].push(p1.x, p1.y, p2.x, p2.y);
            }
          }
        }
      }

      ctx.lineWidth = 0.75;
      
      if (lineBuckets[1].length > 0) {
        ctx.strokeStyle = `rgba(${rgbCyan.r}, ${rgbCyan.g}, ${rgbCyan.b}, 0.08)`;
        ctx.beginPath();
        for (let k = 0; k < lineBuckets[1].length; k += 4) {
          ctx.moveTo(lineBuckets[1][k], lineBuckets[1][k + 1]);
          ctx.lineTo(lineBuckets[1][k + 2], lineBuckets[1][k + 3]);
        }
        ctx.stroke();
      }

      if (lineBuckets[2].length > 0) {
        ctx.strokeStyle = `rgba(${rgbCyan.r}, ${rgbCyan.g}, ${rgbCyan.b}, 0.18)`;
        ctx.beginPath();
        for (let k = 0; k < lineBuckets[2].length; k += 4) {
          ctx.moveTo(lineBuckets[2][k], lineBuckets[2][k + 1]);
          ctx.lineTo(lineBuckets[2][k + 2], lineBuckets[2][k + 3]);
        }
        ctx.stroke();
      }

      if (lineBuckets[3].length > 0) {
        ctx.strokeStyle = `rgba(${rgbCyan.r}, ${rgbCyan.g}, ${rgbCyan.b}, 0.32)`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        for (let k = 0; k < lineBuckets[3].length; k += 4) {
          ctx.moveTo(lineBuckets[3][k], lineBuckets[3][k + 1]);
          ctx.lineTo(lineBuckets[3][k + 2], lineBuckets[3][k + 3]);
        }
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        const maxPulses = width < 768 ? 3 : 6;
        for (let k = pulses.length - 1; k >= 0; k--) {
          const pulse = pulses[k];
          pulse.progress += pulse.speed;

          const dx = pulse.p1.x - pulse.p2.x;
          const dy = pulse.p1.y - pulse.p2.y;
          if (pulse.progress >= 1 || (dx * dx + dy * dy) > maxDistanceSq) {
            pulses.splice(k, 1);
            continue;
          }

          const px = pulse.p1.x + (pulse.p2.x - pulse.p1.x) * pulse.progress;
          const py = pulse.p1.y + (pulse.p2.y - pulse.p1.y) * pulse.progress;
          const alpha = Math.sin(pulse.progress * Math.PI) * 0.95;

          ctx.fillStyle = `rgba(${pulse.color.r}, ${pulse.color.g}, ${pulse.color.b}, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${pulse.color.r}, ${pulse.color.g}, ${pulse.color.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (pulses.length < maxPulses && activeConnections.length > 0) {
          const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
          const isCyan = Math.random() > 0.4;
          pulses.push({
            p1: conn.p1,
            p2: conn.p2,
            progress: 0,
            speed: Math.random() * 0.012 + 0.008,
            color: isCyan ? rgbCyan : rgbBlue,
          });
        }
      }
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
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let idleId = null;
    let timerId = null;

    const startCanvas = () => {
      resize();
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(loop);
      }
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(startCanvas, { timeout: 100 });
    } else {
      timerId = setTimeout(startCanvas, 50);
    }

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
      if (animId) {
        cancelAnimationFrame(animId);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
