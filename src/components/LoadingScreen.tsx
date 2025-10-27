import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center transition-opacity duration-500" style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <div className="text-center">
        <div className="text-8xl mb-8 animate-float">🌸</div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Elena's Flowers
        </h1>
        <p className="text-xl text-muted-foreground mb-8">Загружаем красоту...</p>
        
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto relative">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground font-medium">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;