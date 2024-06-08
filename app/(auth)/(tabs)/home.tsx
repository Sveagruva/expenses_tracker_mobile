import {useEffect, useState} from "react";
import Constants from "expo-constants/src/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {ThemedInput} from "@/components/ui/ThemedInput";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {ThemedLink} from "@/components/ui/ThemedLink";
import {SplashScreen} from "expo-router";
import {SafeArea} from "@/components/ui/SafeArea";
import {PaddedScreen} from "@/components/ui/PaddedScreen";
import {DateTime} from "luxon";
import {useTransactionsTotal} from "@/hooks/queries/useTransactionsTotal";
import {LayoutChangeEvent, TouchableOpacity} from "react-native";
import {TransactionCategoriesChart} from "@/components/app/TransactionCategoriesChart";
import {TransactionsList} from "@/components/app/TransactionsList";
import Entypo from '@expo/vector-icons/Entypo';
import {NewTransactionFloatingButton} from "@/components/app/NewTransactionFloatingButton";


export default function HomeScreen() {
  const [date, setDate] = useState(DateTime.now());

  return (
    <SafeArea>
      <PaddedScreen>
        <ThemedView style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
          <ThemedText type="title">Today</ThemedText>
          <ThemedLink push href="/account">
            <ThemedText type="title">
              Account
            </ThemedText>
          </ThemedLink>
        </ThemedView>
        <TransactionCategoriesChart date={date}/>
        <TransactionsList/>
        <NewTransactionFloatingButton/>
      </PaddedScreen>
    </SafeArea>
  );
}
