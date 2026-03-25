import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export function Button({ title, onPress, isLoading = false, type = 'primary', disabled = false }: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return colors.textLight;
    switch (type) {
      case 'secondary': return 'transparent';
      case 'danger': return colors.danger;
      case 'primary':
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (type === 'secondary') return disabled ? colors.textLight : colors.primary;
    return '#FFF';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        type === 'secondary' && styles.buttonSecondary
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
