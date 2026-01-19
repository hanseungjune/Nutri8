import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../constants/theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof Theme.spacing;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'default',
  padding = 'lg',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return [styles.card, Theme.shadow.md];
      case 'outlined':
        return [styles.card, styles.outlined, Theme.shadow.none];
      default:
        return [styles.card, Theme.shadow.base];
    }
  };

  return (
    <View style={[
      ...getVariantStyle(), 
      { padding: Theme.spacing[padding] },
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.paper,
    borderRadius: Theme.borderRadius.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
});
