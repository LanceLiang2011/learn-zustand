import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import type { Product } from "@/store/interface";
import { useCartStore } from "@/store/cartStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const { addProduct, reduceProduct, products, clearCart, sum } =
    useCartStore();

  const renderItem: ListRenderItem<Product & { quantity: number }> = ({
    item,
  }) => (
    <View style={styles.cardItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cardItemImage} />
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
      <Text style={{ paddingHorizontal: 2, right: 2 }}>{item.quantity}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => addProduct(item)}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reduceProduct(item.id)}>
          <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => <Text>Total: {sum()}</Text>}
      />
      <Button title="Clear Cart" onPress={clearCart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 100,
    paddingLeft: 20,
  },
  cardItemImage: {
    height: 40,
    width: 40,
    objectFit: "contain",
  },
  itemContainer: { padding: 20 },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  text: {},
});
