import React, { useEffect, useRef } from 'react';

export default function AmbientParticles({ envId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate Particles based on envId
    const particleCount = envId === 'rain' ? 120 : 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (envId === 'rain' ? 1.5 : 2.5) + 0.5,
      speedY: envId === 'rain' ? Math.random() * 8 + 4 : Math.random() * 0.8 + 0.2,
      speedX: envId === 'rain' ? -Math.random() * 1 - 0.5 : (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      length: envId === 'rain' ? Math.random() * 20 + 10 : 0
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        if (envId === 'rain') {
          // Rain Drop Lines
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
          ctx.stroke();
        } else {
          // Glowing Ambient Particles
          const glowColor =
            envId === 'bus' ? '224, 242, 254' :
            envId === 'salon' ? '253, 230, 138' :
            '254, 215, 170'; // Morning gold

          ctx.fillStyle = `rgba(${glowColor}, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [envId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
