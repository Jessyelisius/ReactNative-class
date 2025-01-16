import { Link } from "expo-router";
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Try } from "expo-router/build/views/Try";

const logo = require("./../assets/images/splash-img.png");
const contactLogo = require("./../assets/images/contact-icon.png");

export default function HomeScreen() {
  const [db, setDb] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const main = async () => {
      const database = await SQLite.openDatabaseAsync("contacts.db");
      setDb(database);
      await initializeDatabase(database);
      await fetchContacts(database);
    };
    main();
  }, []);

  const initializeDatabase = async (database) => {
    try {
      await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL);
`);
      console.log("Table initialized successfully");
    } catch (error) {
      console.log(`Error initializing database: ${erorr}`);
    }
  };

  const fetchContacts = async (database) => {
    try {
      const rows = await database.getAllAsync("SELECT * FROM contacts");
      setContacts(rows);
    } catch (error) {
      console.log(`An Error ocurred while fetching contacts: ${error}`);
    }
  };
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
            {/* <Image source={logo} style={{ width: 60, height: 60 }} /> */}
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                paddingHorizontal: 20,
                borderRadius: 5,
                paddingVertical: 10,
              }}
              activeOpacity={0.5}
            >
              <Link
                style={{ color: "white", fontSize: 14, fontWeight: "500" }}
                href="/Login"
              >
                Login
              </Link>
            </TouchableOpacity>
          </View>
          {/* children */}
          <View style={{ flex: 8 }}>
            <ScrollView>
              <View style={{ marginTop: 5 }}>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <View style={styles.contact} key={contact.id}>
                      <View>
                        <Image
                          source={contactLogo}
                          style={styles.contactImage}
                        />
                      </View>
                      <View>
                        <Text>{contact.name}</Text>
                        <Text>{contact.phone}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{ textAlign: "center", marginTop: 25 }}>
                    No Contacts Available
                  </Text>
                )}
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
