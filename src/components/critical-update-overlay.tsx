import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

type CriticalUpdateOverlayProps = {
  visible: boolean;
};

export function CriticalUpdateOverlay({ visible }: CriticalUpdateOverlayProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
      <ThemedText style={styles.text}>Installing critical update...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
