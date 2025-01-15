import { Link } from "expo-router";
import { Image, Keyboard, Platform, ScrollView } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("./../assets/images/splash-img.png");
const contactLogo = require("./../assets/images/contact-icon.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          style={{ flex: 1, paddingHorizontal: 15 }}
          onPress={() => Keyboard.dismiss()}
        >
          {/* header */}
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={logo} style={{ width: 48, height: 48 }} />
              <Text style={styles.headerText}>Contacts</Text>
            </View>
            <Image source={logo} style={{ width: 60, height: 60 }} />
          </View>
          {/* children */}
          <View style={{ flex: 8 }}>
            <ScrollView>
              <View style={{ marginTop: 5 }}>
                <View style={styles.contact}>
                  <View>
                    <Image source={contactLogo} style={styles.contactImage} />
                  </View>
                  <View>
                    <Text>Abraham</Text>
                    <Text>09032825450</Text>
                  </View>
                </View>
                <View style={styles.contact}>
                  <View>
                    <Image source={contactLogo} style={styles.contactImage} />
                  </View>
                  <View>
                    <Text>Abraham</Text>
                    <Text>09032825450</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by Swift Tech</Text>
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
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  footer: { flex: 1, justifyContent: "center", alignItems: "center" },
  footerText: { fontSize: 16, fontWeight: "500", textAlign: "center" },
  contact: {
    backgroundColor: "#eeeeee",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  contactImage: { width: 35, height: 35, marginRight: 5 },
});
