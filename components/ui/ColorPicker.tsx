import {useEffect, useState} from "react";
import ColorPicker, {Swatches} from "reanimated-color-picker";
import {ThemedView} from "@/components/ui/ThemedView";
import {TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ui/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";


export function ThemedColorPicker({colors, value, onChange}: {
  colors: string[],
  value: string,
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tint = useThemeColor({ }, 'tint');

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  const menu = (
    <ColorPicker
      value={value}
      onChange={(c: any) => {
        onChange(c.hex)
      }}
      onComplete={(color: any) => {
        onChange(color.hex)
      }}
    >
      <Swatches colors={colors} />
    </ColorPicker>
  );

  return (
    <SwitchMenu menu={menu} isOpen={isOpen} setIsOpen={setIsOpen}>
      <ThemedView style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: tint,
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 15,
      }}>
        <ThemedText>
          Chosen color:
        </ThemedText>
        <ThemedView style={{backgroundColor: value, width: 20, height: 20}} />
      </ThemedView>
    </SwitchMenu>
  )
}

function SwitchMenu({children, menu, isOpen, setIsOpen}: {
  children: any,
  menu: any,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
      {isOpen && (
        <ThemedView style={{position: "absolute", top: 0, left: 0, right: 0}}>
          {menu}
        </ThemedView>
      )}
    </ThemedView>
  );
}
