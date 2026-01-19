import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { Theme } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Theme.colors.text.hint}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    ...Theme.common.input,
    color: Theme.colors.text.primary,
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  error: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.error,
    marginTop: Theme.spacing.xs,
  },
  hint: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.hint,
    marginTop: Theme.spacing.xs,
  },
});
