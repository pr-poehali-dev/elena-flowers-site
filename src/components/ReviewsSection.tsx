import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Отзывы клиентов
          </h2>
          <p className="text-xl text-gray-600">Нам доверяют тысячи покупателей</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="scroll-reveal hover:shadow-xl transition-shadow border-pink-100">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="fill-yellow-400 text-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-semibold text-pink-600">— {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
