import { Host, ScrollView, LazyHStack, RNHostView } from '@expo/ui/swift-ui';
import { StyleSheet, View } from 'react-native';

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
      <ScrollView axes="horizontal" showsIndicators={false}>
        <LazyHStack spacing={12}>
          {products.map(product => (
            <RNHostView key={product.id} matchContents>
              <View style={styles.cardWrapper}>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                />
              </View>
            </RNHostView>
          ))}
        </LazyHStack>
      </ScrollView>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    width: '100%',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
