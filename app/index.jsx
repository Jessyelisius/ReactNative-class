import { Link } from "expo-router";
import { Text, View, StyleSheet, TextInput, Button, Pressable, Image, Keyboard, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import AuthLayout from "./Layouts/AuthLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import AddContactModal from "@/components/ui/addContactModal";


const logo = require("./../assets/images/splash-img.png");
export default function HomeScreen() {
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')

  const [ModalVisibility, setModalVisibility] = useState(false)
  const [db, setdb] = useState(null);
  const [contacts, setcontacts] = useState([]);

  const initialisedDatabase = async(database) => {
    try {
      await database.execAsync(`PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
        );`
      );
      console.log("Table initialised successfully");

    } catch (error) {
      console.log("Error initialising database", error);
    }
  }

  const fetchContact = async(database) => {
    try {
      const rows = await database.getAllAsync("SELECT * FROM contacts");
      setcontacts(rows.reverse())
    } catch (error) {
      console.error("Error fetching contacts", error)
    }
  }

  const addContact = async( name, phone) => {
    if(!db) return;

    try {

      if(name?.length<=0) return Alert.alert("Error", 'Name is required');
      if(phone?.length<=0) return Alert.alert("Error", 'Mobile Number is required');

      let newame = `${name} ${Math.random().toFixed(2)}`;
      let newphone = phone

      const result = await db.runAsync(
        "INSERT INTO contacts (name, phone) VALUES (?, ?)",
        newame,
        newphone
      );
      console.log("conatcts added with ID", result.lastInnerRowId);
      setModalVisibility(false)
      setname("")
      setphone("")

      await fetchContact(db);
    } catch (error) {
      console.error("error adding contact", error);
    }
  };

  
  useEffect(() => {
    (async()=>{
      const database = await SQLite.openDatabaseAsync('contacts.db');
      setdb(database)
      await initialisedDatabase(database)
      await fetchContact(database)
      // await addContact(database)
    })()
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" />
          <View
            style={{ flex: 1 }}
          >
            <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
              {/* header */}
              <View style={styles.header}>
                <Image source={logo} style={{ width: 60, height: 60 }} />
                <Text style={styles.headerText}>Contacts</Text>
              </View>

              {/* children */}
              <View style={{ flex: 1 , paddingVertical:30, paddingHorizontal:20}}>
                <ScrollView>
                  {
                    contacts.length > 0 ? (
                      contacts.map((i, key) => (
                        <TouchableOpacity key={key} style={styles.ItemView}>
                          <Image source={require('../assets/images/splash-img.png')} style={{width:40, height:40}} />

                          <View>
                            <Text style={styles.ItemText}>{i.name} </Text>
                            <Text style={[styles.ItemText,{fontSize:13}]}>{i.phone}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ): <Text>No contacts found</Text>
                  }
                  {/* items */}
                  

                  

                </ScrollView>
                    <TouchableOpacity onPress={()=>setModalVisibility(true)} style={styles.Button}><Text style={{color:"white", fontWeight:"bold"}} >Add Contact</Text></TouchableOpacity>

              </View>
                {/* footer */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Developed by Jessy</Text>
                </View>
                </Pressable>
              </View>

                <AddContactModal visibility={ModalVisibility} 
                setVisibility={setModalVisibility} 
                AddContact={addContact} 
                name={name} 
                setname={setname} 
                phone={phone} 
                setphone={setphone}
                />
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:30
  },
  footer: { justifyContent: "center", alignItems: "center" },
  footerText: { fontSize: 16, fontWeight: "500", textAlign: "center" },
  ItemView:{
    backgroundColor:'gray',
    flexDirection:'row',
    padding:10,
    borderRadius:10,
    marginBottom: 10,
    gap:10
  },
  ItemText:{
    color:'white',
    fontSize:15,
    fontWeight:'600'
  },
  Button:{
    height: 50,
    backgroundColor:"#02A9EA",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center"
  }
});