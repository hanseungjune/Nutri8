import React, { useEffect, useRef, ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { Theme } from '../../constants/theme';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  distance?: number;
  style?: ViewStyle;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  duration = Theme.animation.base,
  delay = 0,
  distance = 50,
  style,
}) => {
  const translateValue = useRef(new Animated.Value(distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateValue, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return [{ translateX: translateValue }];
      case 'right':
        return [{ translateX: Animated.multiply(translateValue, -1) }];
      case 'down':
        return [{ translateY: Animated.multiply(translateValue, -1) }];
      case 'up':
      default:
        return [{ translateY: translateValue }];
    }
  };

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: getTransform(),
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
