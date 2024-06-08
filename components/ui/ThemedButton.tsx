import {Text, type TextProps, StyleSheet, Button, ButtonProps, TouchableOpacity} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  type?: 'bordered';
  title: string,
  onPress?: () => void
};

export function ThemedButton({
  lightColor,
  darkColor,
  type = 'bordered',
  title,
  onPress,
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const styles = StyleSheet.create({
    bordered: {
      fontSize: 16,
      lineHeight: 24,
      borderRadius: 20,
      borderWidth: 1,
      // borderColor: tint,
      borderStyle: 'solid',

    },
  });

  if(type === 'bordered') {
    return <TouchableOpacity
      style={{
        backgroundColor: '#108ee9',
        // width: 20,
        // height: 20,
        borderRadius: 40,
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20}}>{title}</Text>
    </TouchableOpacity>
  }

}

