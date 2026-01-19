import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Theme } from '../../constants/theme';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles = [styles.button, styles[size]];
    
    if (disabled || loading) {
      return [...baseStyles, styles.disabled];
    }
    
    switch (variant) {
      case 'secondary':
        return [...baseStyles, styles.secondary];
      case 'outline':
        return [...baseStyles, styles.outline];
      case 'text':
        return [...baseStyles, styles.text];
      default:
        return [...baseStyles, styles.primary];
    }
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles = [styles.buttonText, styles[`${size}Text`]];
    
    if (disabled || loading) {
      return [...baseStyles, styles.disabledText];
    }
    
    switch (variant) {
      case 'secondary':
        return [...baseStyles, styles.secondaryText];
      case 'outline':
        return [...baseStyles, styles.outlineText];
      case 'text':
        return [...baseStyles, styles.textText];
      default:
        return [...baseStyles, styles.primaryText];
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : Theme.colors.primary} />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Theme.common.button,
    ...Theme.shadow.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: Theme.colors.border.light,
    ...Theme.shadow.none,
  },
  
  // Sizes
  sm: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  md: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  lg: {
    paddingVertical: Theme.spacing.base,
    paddingHorizontal: Theme.spacing.xl,
  },
  
  // Text styles
  buttonText: {
    fontWeight: Theme.typography.fontWeight.bold,
    textAlign: 'center',
  },
  smText: {
    fontSize: Theme.typography.fontSize.sm,
  },
  mdText: {
    fontSize: Theme.typography.fontSize.md,
  },
  lgText: {
    fontSize: Theme.typography.fontSize.lg,
  },
  primaryText: {
    color: Theme.colors.text.inverse,
  },
  secondaryText: {
    color: Theme.colors.text.inverse,
  },
  outlineText: {
    color: Theme.colors.primary,
  },
  textText: {
    color: Theme.colors.primary,
  },
  disabledText: {
    color: Theme.colors.text.disabled,
  },
});
