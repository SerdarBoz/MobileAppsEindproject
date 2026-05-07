import { useEffect } from "react";
import { Stack } from "expo-router";
import { initDatabase, seedDatabase } from "@/db/database";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
    seedDatabase();
  }, []);

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="create-account" />
        <Stack.Screen name="overview" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="new-workorder" />
      </Stack>
    </PaperProvider>
  );
}
