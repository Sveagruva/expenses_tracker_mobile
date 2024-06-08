import {SafeArea} from "@/components/ui/SafeArea";
import {PaddedScreen} from "@/components/ui/PaddedScreen";
import {useCategories} from "@/hooks/queries/useCategories";
import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {NewCategoryFloatingButton} from "@/components/app/NewCategoryFloatingButton";
import {FlatList, TouchableOpacity} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {deleteCategoryMutation} from "@/hooks/mutations/deleteCategoryMutation";
import {useThemeColor} from "@/hooks/useThemeColor";


function CategoryItem({category}: {category: any}) {
  const deleteCategory = deleteCategoryMutation();
  const iconColor = useThemeColor({}, 'icon');


  return (
    <ThemedView style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
      <ThemedView style={{flex: 1, flexDirection: "row", alignItems: "center", gap: 10}}>
        <ThemedText style={{fontSize: 20}}>{category.name}</ThemedText>
        <ThemedView style={{
          width: 20,
          height: 20,
          backgroundColor: category.color,
        }}/>
      </ThemedView>
      <TouchableOpacity onPress={() => {
        deleteCategory.mutate({id: category.id});
      }}>
        <AntDesign name="delete" size={24} color={iconColor} />
      </TouchableOpacity>
    </ThemedView>
  )
}

export default function CategoriesScreen() {
  const categories = useCategories();

  if(categories.isLoading) {
    return null;
  }


  return (
    <SafeArea>
      <PaddedScreen>
        <FlatList contentContainerStyle={{
          gap: 15,
        }} data={categories.data!} renderItem={({item}) => <CategoryItem category={item} />}/>
        <NewCategoryFloatingButton />
      </PaddedScreen>
    </SafeArea>
  );
}
