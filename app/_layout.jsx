import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'outfit': require('../assets/fonts/SourGummy-Regular.ttf'),
        'outfit-medium': require('../assets/fonts/SourGummy-Medium.ttf'),
        'outfit-bold': require('../assets/fonts/SourGummy-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="loginPage" options={{ headerShown: false }} />
            <Stack.Screen name="registerPage" options={{ headerShown: false }} />
        </Stack>
    );
}
