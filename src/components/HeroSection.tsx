import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BouquetViewer3D from '@/components/BouquetViewer3D';

interface HeroSectionProps {
  scrollY: number;
  heroRef: RefObject<HTMLDivElement>;
  aiBudget: string;
  setAiBudget: (value: string) => void;
  generateBouquet: () => void;
  show3DViewer: boolean;
  setShow3DViewer: (show: boolean) => void;
  aiPrompt: string;
  setAiPrompt: (value: string) => void;
  handle3DGeneration: () => void;
}

const HeroSection = ({
  scrollY,
  heroRef,
  aiBudget,
  setAiBudget,
  generateBouquet,
  show3DViewer,
  setShow3DViewer,
  aiPrompt,
  setAiPrompt,
  handle3DGeneration,
}: HeroSectionProps) => {
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        transform: `translateY(${scrollY * 0.5}px)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 opacity-60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <div className="inline-block mb-6 px-6 py-2 bg-pink-100 rounded-full">
            <span className="text-pink-600 font-medium">🎁 Скидка 25% на первый заказ через Telegram!</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Цветы с душой
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Создайте уникальный букет с помощью нашего ИИ-дизайнера или выберите из готовых композиций
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border border-pink-100">
            <h3 className="text-2xl font-bold text-pink-600 mb-4 flex items-center justify-center gap-2">
              <Icon name="Sparkles" size={24} />
              ИИ-генератор 3D букетов
            </h3>
            <p className="text-gray-600 mb-6">Опишите букет — увидите его в 3D!</p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-6">
              <Input
                type="text"
                placeholder="Например: 11 красных роз с белыми лилиями"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 text-lg py-6 border-pink-200 focus:ring-pink-400"
              />
              <Dialog open={show3DViewer} onOpenChange={setShow3DViewer}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    onClick={handle3DGeneration}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
                  >
                    <Icon name="Box" className="mr-2" size={20} />
                    Создать 3D букет
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>3D визуализация букета</DialogTitle>
                    <DialogDescription>
                      {aiPrompt || 'Ваш букет'}
                    </DialogDescription>
                  </DialogHeader>
                  <BouquetViewer3D description={aiPrompt} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="border-t border-pink-100 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Или укажите бюджет:</h4>
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <Input
                  type="number"
                  placeholder="Введите сумму в рублях"
                  value={aiBudget}
                  onChange={(e) => setAiBudget(e.target.value)}
                  className="flex-1 text-lg py-6 border-pink-200 focus:ring-pink-400"
                />
                <Button 
                  size="lg"
                  onClick={generateBouquet}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
                >
                  <Icon name="Wand2" className="mr-2" size={20} />
                  Подобрать букет
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-pink-600">
              <Icon name="Truck" size={24} />
              <span className="font-medium">Доставка за 2 часа</span>
            </div>
            <div className="flex items-center gap-2 text-pink-600">
              <Icon name="Heart" size={24} />
              <span className="font-medium">Свежие цветы</span>
            </div>
            <div className="flex items-center gap-2 text-pink-600">
              <Icon name="Award" size={24} />
              <span className="font-medium">Гарантия качества</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
