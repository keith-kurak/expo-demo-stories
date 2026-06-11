import { Observe } from 'expo-observe';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ProductCard, CARD_WIDTH, CARD_HEIGHT } from './product-card';

import { Spacing } from '@/constants/theme';

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type ProductCarouselProps = {
  products: Product[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {products.map(product => (
        <Link
          key={product.id}
          href={{
            pathname: '/product/[id]',
            params: product,
          }}
          onPress={() => {
            Observe.logEvent('product.tapped', {
              attributes: { productId: product.id, title: product.title },
            });
          }}
          asChild>
          <Pressable>
            <ProductCard
              title={product.title}
              description={product.description}
              image={product.image}
            />
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
