import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  fullScreen = false,
}) => {
  const containerStyle = fullScreen ? styles.fullScreen : styles.container;

  return (
    <View style={containerStyle}>
      <MaterialCommunityIcons 
        name="alert-circle-outline" 
        size={48} 
        color={Theme.colors.error} 
      />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.background.default,
    padding: Theme.spacing.xl,
  },
  message: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.base,
  },
  retryText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});
