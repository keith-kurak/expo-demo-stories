import { ScrollView, StyleSheet } from 'react-native';

import { ProductCard } from './product-card';

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
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
