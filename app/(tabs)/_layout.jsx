import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './home';
import Favorite from './favorite';
import Profile from './profile';
import AddPet from "./addPet";
import Chat from './chats';
import Colors from "../../assets/Colors";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    left: 16,
                    right: 16,
                    height: 72,
                    width: '100%',
                    elevation: 5,
                    borderRadius: 16,
                    backgroundColor: Colors.white,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopColor: '#a9a4a4',
                    shadowOpacity: 0.2,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: 2,
                    fontFamily: 'outfit',
                    color: Colors.primary
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                color={focused ? Colors.primary : "gray"}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                color={focused ? Colors.primary : "gray"}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="AddPet"
                component={AddPet}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: focused ? Colors.primary : Colors.light_pink,
                                height: 60,
                                width: 60,
                                borderRadius: 50,
                                marginBottom: 35, // above the navbar
                            }}
                        >
                            <Ionicons
                                name={focused ? "add-circle" : "add-circle-outline"}
                                color={focused ? Colors.light_pink : Colors.white}
                                size={32}
                            />
                        </View>
                    ),
                }}
            />



            <Tab.Screen
                name="Chats"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                                color={focused ? Colors.primary : "gray"}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "heart" : "heart-outline"}
                                color={focused ? Colors.primary : "gray"}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
