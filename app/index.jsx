import { Link } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import AddContactModal from "./Layouts/AddContactModal";

const logo = require("./../assets/images/splash-img.png");
const contactLogo = require("./../assets/images/contact-icon.png");

export default function HomeScreen() {
  const [db, setDb] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

  const addContact = async (db) => {
    if (!db) return;

    try {
      // const name = `John Doe ${Math.random().toFixed(2)}`;
      // const phone = "123-456-7890";
      const result = await db.runAsync(
        "INSERT INTO contacts (name, phone) VALUES (?, ?)",
        name,
        phone
      );
      console.log(`Contacts added with ID: ${result.lastInsertRowId}`);
      setName("");
      setPhone("");
      setModalVisible(false);
      await fetchContacts(db);
    } catch (error) {
      console.log(`An error occurred while adding contacts: ${error}`);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <StatusBar barStyle={"dark-content"} />
      {/* <Pressable
        style={{ flex: 1, paddingHorizontal: 15 }}
        onPress={() => Keyboard.dismiss()}
      > */}
      {/* header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={logo} style={{ width: 48, height: 48 }} />
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        {/* <Image source={logo} style={{ width: 60, height: 60 }} /> */}
        <Link
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "500",
            backgroundColor: "blue",
            paddingHorizontal: 20,
            borderRadius: 5,
            paddingVertical: 10,
          }}
          href="/Login"
        >
          Login
        </Link>
        {/* <Text style={{ color: "white" }}>Add</Text> */}
      </View>
      {/* children */}
      <View style={{ flex: 8 }}>
        <ScrollView>
          <View style={{ marginTop: 5 }}>
            {contacts.length > 0 ? (
              contacts
                .slice()
                .reverse()
                .map((contact) => (
                  <View style={styles.contact} key={contact.id}>
                    <View>
                      <Image source={contactLogo} style={styles.contactImage} />
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
        {/* Floating Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <AddContactModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        addContact={addContact}
        db={db}
      />
      {/* footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Swift Tech</Text>
      </View>
      {/* </Pressable> */}
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
  floatingButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 10,
    elevation: 5, // For Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
