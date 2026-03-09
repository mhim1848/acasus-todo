import { Stack } from "expo-router";
import './globals.css';
import {TodoProvider} from '@/context/TodoContext';

export default function RootLayout() {
  return (<TodoProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tasks" options={{ headerShown: false }} />
    </Stack>
  </TodoProvider>);
}
