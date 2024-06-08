import {useAuth} from "@/hooks/useAuth";
import {useState} from "react";
import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {useCategories} from "@/hooks/queries/useCategories";
import {Dropdown} from "react-native-element-dropdown";
import {StyleSheet} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";


export function CategoryInput({category, setCategory}: any) {
  const auth = useAuth();
  const categories = useCategories();

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');


  const items = categories.isLoading ? [] : categories.data!.map(({id, name}) => ({label: name, value: id}));

  const color = useThemeColor({  }, 'text');
  const tint = useThemeColor({  }, 'tint');



  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 5,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: tint,
      borderStyle: 'solid',
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });



  const renderItem = (item: any) => {
    return (
      <ThemedView style={styles.item}>
        <ThemedText style={styles.textItem}>{item.label}</ThemedText>
      </ThemedView>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      // selectedTextStyle={styles.selectedTextStyle}
      // inputSearchStyle={styles.inputSearchStyle}
      // iconStyle={styles.iconStyle}
      data={items}
      search={false}
      renderRightIcon={() => null}
      // maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={category}
      onChange={item => {
        setCategory(item.value);
      }}
      renderItem={renderItem}
    />
  );
}


