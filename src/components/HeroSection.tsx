import { RefObject, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface HeroSectionProps {
  scrollY: number;
  heroRef: RefObject<HTMLDivElement>;
  aiBudget: string;
  setAiBudget: (value: string) => void;
  generateBouquet: () => void;
  aiPrompt: string;
  setAiPrompt: (value: string) => void;
}

interface GeneratedImage {
  url: string;
  prompt: string;
}

const HeroSection = ({
  scrollY,
  heroRef,
  aiBudget,
  setAiBudget,
  generateBouquet,
  aiPrompt,
  setAiPrompt,
}: HeroSectionProps) => {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  const generateBouquetImage = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Опишите букет для генерации изображения');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('https://functions.poehali.dev/62345321-c381-4968-9168-d4167260b402', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка генерации изображения');
      }

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratedImage({ url: data.imageUrl, prompt: aiPrompt });
        setShowImageDialog(true);
        toast.success('Изображение букета создано! 🎨');
      } else {
        throw new Error(data.message || 'Не удалось создать изображение');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Не удалось создать изображение. Попробуйте снова.');
    } finally {
      setIsGenerating(false);
    }
  };
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
            
            <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-6">
              <Textarea
                placeholder="Например: 11 красных роз с белыми лилиями и зеленью"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="text-lg border-pink-200 focus:ring-pink-400 min-h-[100px]"
              />
              <Button 
                size="lg"
                onClick={generateBouquetImage}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Создаём букет...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" className="mr-2" size={20} />
                    Создать букет с помощью ИИ
                  </>
                )}
              </Button>
            </div>

            <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Ваш букет готов! 💐</DialogTitle>
                  <DialogDescription>
                    {generatedImage?.prompt}
                  </DialogDescription>
                </DialogHeader>
                {generatedImage && (
                  <div className="space-y-4">
                    <img 
                      src={generatedImage.url} 
                      alt="Сгенерированный букет"
                      className="w-full rounded-lg shadow-xl"
                    />
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-pink-500 hover:bg-pink-600"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generatedImage.url;
                          link.download = 'bouquet.png';
                          link.click();
                          toast.success('Изображение скачано!');
                        }}
                      >
                        <Icon name="Download" className="mr-2" size={18} />
                        Скачать
                      </Button>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          setShowImageDialog(false);
                          toast.success('Добавьте нужные товары в корзину!');
                        }}
                      >
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        Заказать такой
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

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