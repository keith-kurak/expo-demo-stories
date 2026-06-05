import { Host, HorizontalMultiBrowseCarousel, RNHostView } from '@expo/ui/jetpack-compose';
import { size } from '@expo/ui/jetpack-compose/modifiers';
import { StyleSheet } from 'react-native';

import { ProductCard, CARD_WIDTH, CARD_HEIGHT } from './product-card';

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
    <Host matchContents={{ vertical: true }} style={styles.host}>
      <HorizontalMultiBrowseCarousel
        preferredItemWidth={CARD_WIDTH}
        itemSpacing={12}
        flingBehavior="singleAdvance">
        {products.map(product => (
          <RNHostView key={product.id} matchContents modifiers={[size(CARD_WIDTH, CARD_HEIGHT)]}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
            />
          </RNHostView>
        ))}
      </HorizontalMultiBrowseCarousel>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    width: '100%',
  },
});
