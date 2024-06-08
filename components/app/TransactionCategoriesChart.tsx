import {CategoriesTotal, useCategoriesTotal} from "@/hooks/queries/useCategoriesTotal";
import {DateTime} from "luxon";
import React, {useEffect, useState} from "react";
import {ThemedText} from "@/components/ui/ThemedText";
import {ThemedView} from "@/components/ui/ThemedView";
import {FlatList} from "react-native";


export function TransactionCategoriesChart({date}: { date: DateTime }) {
  const categoriesTotals = useCategoriesTotal(date);
  // console.log("categoriesTotals", categoriesTotals)
  // const [layoutWidth, setLayoutWidth] = useState(0);
  // const onLayout = (event: LayoutChangeEvent) => {
  //   setLayoutWidth(event.nativeEvent.layout.width);
  // }

  if (!Array.isArray(categoriesTotals) || categoriesTotals.some(({isLoading}) => isLoading)) {
    return null;
  }

  const total = categoriesTotals.reduce((acc, curr) => acc + (curr.data as any).total, 0);

  return (
    <ThemedView>
      <ThemedText type="title" style={{
        textAlign: 'center',
      }}>
        Total {total}
      </ThemedText>
      <FlatList
        contentContainerStyle={{
          gap: 10,
        }}
        horizontal
        style={{
          flexGrow: 0,
          overflow: 'visible'
        }}
        data={categoriesTotals}
        renderItem={({item}) => <CategoryItem category={item.data} />}
      />
    </ThemedView>
  )
}

function CategoryItem({category}: {category: any}) {
  return (
    <ThemedView style={{
      backgroundColor: category.color,
      borderRadius: 10,
      padding: 5,
      paddingHorizontal: 15,
    }}>
      <ThemedText>
        {category.name}:
        {category.total}
      </ThemedText>
    </ThemedView>
  )
}
