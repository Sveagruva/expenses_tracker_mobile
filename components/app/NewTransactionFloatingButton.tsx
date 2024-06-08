import {TouchableOpacity} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {useRouter} from "expo-router";
import {useThemeColor} from "@/hooks/useThemeColor";


export function NewTransactionFloatingButton() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const onPress = () => {
    router.push("/addTransaction");
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 25,
        right: 10,
        backgroundColor: iconColor,
        borderRadius: 100,
      }}
    >
      <Entypo name="plus" size={50} color={backgroundColor} />
    </TouchableOpacity>

  )
}
