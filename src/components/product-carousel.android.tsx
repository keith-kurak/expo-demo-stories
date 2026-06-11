import { Host, HorizontalMultiBrowseCarousel, RNHostView } from '@expo/ui/jetpack-compose';
import { size } from '@expo/ui/jetpack-compose/modifiers';
import { Observe } from 'expo-observe';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

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
  const router = useRouter();

  return (
    <Host matchContents={{ vertical: true }} style={styles.host}>
      <HorizontalMultiBrowseCarousel
        preferredItemWidth={CARD_WIDTH}
        itemSpacing={12}
        flingBehavior="singleAdvance">
        {products.map(product => (
          <RNHostView key={product.id} matchContents modifiers={[size(CARD_WIDTH, CARD_HEIGHT)]}>
            <Pressable
              onPress={() => {
                Observe.logEvent('product.tapped', {
                  attributes: { productId: product.id, title: product.title },
                });
                router.push({
                  pathname: '/product/[id]',
                  params: product,
                });
              }}
              style={styles.pressable}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
              />
            </Pressable>
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
  pressable: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
