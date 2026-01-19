import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';

interface EmptyStateProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox-outline',
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name={icon} 
        size={64} 
        color={Theme.colors.text.disabled} 
      />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing['2xl'],
  },
  title: {
    marginTop: Theme.spacing.lg,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
  },
  description: {
    marginTop: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.hint,
    textAlign: 'center',
  },
});
