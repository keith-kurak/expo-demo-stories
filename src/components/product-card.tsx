import { Image } from 'expo-image';
import { Observe } from 'expo-observe';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const CARD_WIDTH = 160;
export const CARD_HEIGHT = 200;

export function ProductCard({ id, title, description, image }: ProductCardProps) {
  return (
    <Link
      href={{
        pathname: '/product/[id]',
        params: { id, title, description, image },
      }}
      onPress={() => {
        Observe.logEvent('product.tapped', {
          attributes: { productId: id, title },
        });
      }}
      asChild>
      <Pressable style={styles.link}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
          <View style={styles.textContainer}>
            <ThemedText type="small" numberOfLines={1}>
              {title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2} style={styles.desc}>
              {description}
            </ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    borderRadius: Spacing.three,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: Spacing.two,
    gap: 2,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
  },
});
