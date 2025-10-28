import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotSpeed: number;
  size: number;
  color: string;
}

const PetalsAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const colors = [
      '#ff6b9d',
      '#ffa8cc',
      '#ff8fab',
      '#ffb3c6',
      '#ff9db8',
      '#ffc2d4',
      '#ff7aa0',
      '#ffccde'
    ];

    const petals: Petal[] = [];
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        z: Math.random() * 1000,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.5 + 0.3,
        speedZ: (Math.random() - 0.5) * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 20 + 15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const drawPetal = (petal: Petal) => {
      ctx.save();
      
      const scale = 1000 / (1000 + petal.z);
      const screenX = petal.x + (petal.x - canvas.width / 2) * (1 - scale);
      const screenY = petal.y + (petal.y - canvas.height / 2) * (1 - scale);
      
      ctx.translate(screenX, screenY);
      
      const perspective = Math.cos(petal.rotationY) * Math.cos(petal.rotationX);
      const opacity = Math.max(0.3, Math.abs(perspective));
      
      ctx.rotate(petal.rotationZ);
      ctx.scale(scale, scale * Math.abs(Math.cos(petal.rotationX)));
      
      ctx.globalAlpha = opacity * (1 - petal.z / 1000) * 0.8;
      
      ctx.fillStyle = petal.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = petal.color;
      
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      const gradient = ctx.createRadialGradient(0, -petal.size * 0.5, 0, 0, 0, petal.size * 1.5);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      petals.forEach(petal => {
        petal.x += petal.speedX;
        petal.y += petal.speedY;
        petal.z += petal.speedZ;
        petal.rotationX += petal.rotSpeed * 0.5;
        petal.rotationY += petal.rotSpeed;
        petal.rotationZ += petal.rotSpeed * 0.3;
        
        if (petal.y > canvas.height + 50) {
          petal.y = -50;
          petal.x = Math.random() * canvas.width;
        }
        
        if (petal.x < -50) petal.x = canvas.width + 50;
        if (petal.x > canvas.width + 50) petal.x = -50;
        
        if (petal.z > 1000) petal.z = 0;
        if (petal.z < 0) petal.z = 1000;
        
        drawPetal(petal);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.6 }}
    />
  );
};

export default PetalsAnimation;
