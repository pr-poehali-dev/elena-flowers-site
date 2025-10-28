import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductsSectionProps {
  products: Product[];
  searchQuery: string;
  addToCart: (product: Product) => void;
}

const ProductsSection = ({ products, searchQuery, addToCart }: ProductsSectionProps) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { value: 'all', label: 'Все товары', icon: 'Store' },
    { value: 'flowers', label: 'Букеты', icon: 'Flower2' },
    { value: 'soil', label: 'Грунты', icon: 'Shovel' },
    { value: 'pots', label: 'Горшки', icon: 'Box' },
    { value: 'accessories', label: 'Аксессуары', icon: 'Wrench' },
  ];

  const renderProducts = (category: string) => {
    const categoryProducts = category === 'all' 
      ? filteredProducts 
      : filteredProducts.filter(p => p.category === category);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryProducts.map((product) => {
          const finalPrice = product.discount 
            ? product.price * (1 - product.discount / 100)
            : product.price;

          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 scroll-reveal border-pink-100">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.discount && (
                  <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {product.discount ? (
                    <>
                      <span className="text-2xl font-bold text-pink-600">
                        {Math.round(finalPrice)}₽
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price}₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-pink-600">
                      {product.price}₽
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Наши товары
          </h2>
          <p className="text-xl text-gray-600">Качественные цветы и товары для сада</p>
        </div>

        <Tabs defaultValue="all" className="scroll-reveal">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8 h-auto bg-transparent">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:bg-pink-500 data-[state=active]:text-white flex items-center gap-2 py-3"
              >
                <Icon name={cat.icon as any} size={18} />
                <span className="hidden sm:inline">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              {renderProducts(cat.value)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsSection;
