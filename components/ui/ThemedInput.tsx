import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {Colors} from "@/constants/Colors";

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'bordered';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = 'bordered',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  const styles = StyleSheet.create({
    bordered: {
      borderWidth: 1,
      borderColor: tint,
      borderStyle: 'solid',
      borderRadius: 20,
      padding: 5,
      paddingHorizontal: 15,
    }
  });

  return (
    <TextInput
      style={[
        { color },
        type === 'bordered' ? styles.bordered : undefined,
        style,
      ]}
      {...rest}
    />
  );
}


