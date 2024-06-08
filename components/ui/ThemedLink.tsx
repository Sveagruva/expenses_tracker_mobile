import {Text, type TextProps, StyleSheet} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {Link} from "expo-router";
import {ExpoRouter} from "@/.expo/types/router";
import * as React from "react";

export type ThemedTextProps = React.PropsWithChildren<ExpoRouter.LinkProps> & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
};

export function ThemedLink({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Link
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
