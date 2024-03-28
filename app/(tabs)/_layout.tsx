import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, View, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useCartStore } from "@/store/cartStore";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign style={{ marginBottom: -3 }} {...props} />;
}

function CartIcon() {
  const { total } = useCartStore();
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.5 : 0.9 }}>
            <View style={[styles.cartCountContainer]}>
              <Text>{total()}</Text>
            </View>
            <AntDesign name="shoppingcart" size={25} color="black" />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="codesquareo" color={color} />
          ),
          headerRight: () => <CartIcon />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <AntDesign name="codesquareo" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartCountContainer: {
    marginRight: 20,
    top: 20,
    right: 20,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#faa",
    zIndex: 10,
    opacity: 0.9,
  },
  buttonContainer: {
    padding: 1,
  },
});
