import { useEffect, useRef } from 'react';

const ParallaxBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.3
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const drawPetal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 1.5, 0, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, 'rgba(255, 182, 193, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 192, 203, 0.6)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.3, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        petal.x += petal.speedX;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        const dx = mouseX - petal.x;
        const dy = mouseY - petal.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          petal.x -= dx * 0.005;
          petal.y -= dy * 0.005;
        }

        if (petal.x < -50) petal.x = canvas.width + 50;
        if (petal.x > canvas.width + 50) petal.x = -50;
        if (petal.y > canvas.height + 50) {
          petal.y = -50;
          petal.x = Math.random() * canvas.width;
        }

        drawPetal(petal.x, petal.y, petal.size, petal.rotation, petal.opacity);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParallaxBackground;