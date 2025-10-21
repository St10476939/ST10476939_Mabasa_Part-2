import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Ionicons, Entypo } from "@expo/vector-icons";

// Type Definitions


type Meal = {
  name: string;
  price: string;
};

type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Details: { meal?: Meal };
};

// Navigation Stack

const Stack = createNativeStackNavigator<RootStackParamList>();

// Decorative Component

function TopLeftStars() {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.starLine}>
          <Text style={styles.star}>★</Text>
          <View style={styles.blueLine} />
        </View>
      ))}
    </View>
  );
}

// Bottom Navigation

type BottomNavProps = {
  navigation: any;
};

function BottomNav({ navigation }: BottomNavProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home" size={24} color="#00aaff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Entypo name="controller-fast-forward" size={24} color="#00aaff" />
      </TouchableOpacity>
    </View>
  );
}

// Home Screen

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: HomeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TopLeftStars />

      <Text style={styles.title}>FreshCafe Chef Helper</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Meal Options</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Starters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Desserts</Text>
      </TouchableOpacity>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

// Menu Screen

type MenuProps = NativeStackScreenProps<RootStackParamList, "Menu">;

function MenuScreen({ navigation }: MenuProps) {
  const meals: Meal[] = [
    { name: "Wings and Ribs", price: "R250.00" },
    { name: "BBQ Wrap", price: "R250.00" },
    { name: "Rib Burger", price: "R125.00" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TopLeftStars />
      <Text style={styles.title}>Main Menu</Text>

      {meals.map((meal, index) => (
        <TouchableOpacity
          key={index}
          style={styles.mealButton}
          onPress={() => navigation.navigate("Details", { meal })}
        >
          <Text style={styles.mealText}>{meal.name}</Text>
          <Text style={styles.mealPrice}>{meal.price}</Text>
        </TouchableOpacity>
      ))}

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

// Details Screen

type DetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

function DetailsScreen({ route, navigation }: DetailsProps) {
  const { meal } = route.params;
  const [dishName, setDishName] = useState(meal?.name || "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(meal?.price || "");

  return (
    <SafeAreaView style={styles.container}>
      <TopLeftStars />
      <Text style={styles.title}>Meal Description</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => alert("Dish saved!")}
      >
        <Text style={styles.saveText}>Save Dish</Text>
      </TouchableOpacity>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
}

// Main App

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: { color: "#000", fontSize: 16, fontWeight: "600" },
  starContainer: { position: "absolute", top: 20, left: 20 },
  starLine: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  star: { color: "white", fontSize: 18 },
  blueLine: { width: 20, height: 3, backgroundColor: "#00aaff", marginLeft: 5 },
  mealButton: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  mealText: { color: "#000", fontWeight: "600", fontSize: 16 },
  mealPrice: { color: "#444", fontSize: 14 },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#00aaff",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontWeight: "700" },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

