import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import Register from "./registerPage";
import Login from "./loginPage";

export default function RootLayout() {
  useFonts({
    'outfit': require('../assets/fonts/SourGummy-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/SourGummy-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/SourGummy-Bold.ttf'),
  })

  return (
      <Stack>
          <Stack.Screen name="index" options={{
            headerShown:false}}/>
        <Stack.Screen name="loginPage" options={{
            headerShown:false}} />
          <Stack.Screen name="registerPage" options={{
            headerShown:false}} />
      </Stack>
  );


}
