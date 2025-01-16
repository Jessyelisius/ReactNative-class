import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("./../../assets/images/splash-img.png");

export default function AuthLayout({ children, screen }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          {/* header */}
          <View style={styles.header}>
            <Image source={logo} style={{ width: 60, height: 60 }} />
            <Text style={styles.headerText}>Contacts-{screen}</Text>
          </View>
          {/* children */}
          <View style={{ flex: 7 }}>{children}</View>
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by Solutech</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: { flex: 1, justifyContent: "center", alignItems: "center" },
  footerText: { fontSize: 16, fontWeight: "500", textAlign: "center" },
});