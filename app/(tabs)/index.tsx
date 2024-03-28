import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import products from "@/assets/data/products.json";
import { AntDesign } from "@expo/vector-icons";
import type { Product } from "@/store/interface";
import { useCartStore } from "@/store/cartStore";

export default function TabOneScreen() {
  const { addProduct, reduceProduct } = useCartStore();

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.cardItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cardItemImage} />
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
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
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
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
