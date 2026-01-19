import React, { useEffect, useRef, ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { Theme } from '../../constants/theme';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = Theme.animation.base,
  delay = 0,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[{ opacity }, style]}>
      {children}
    </Animated.View>
  );
};
