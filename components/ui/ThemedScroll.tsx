import {ScrollView, ScrollViewProps, View, type ViewProps} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedScrollProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScroll({style, lightColor, darkColor, ...otherProps}: ThemedScrollProps) {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <ScrollView style={[{backgroundColor}, style]} {...otherProps} />;
}
