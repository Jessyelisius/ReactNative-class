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
  return (
    <AuthLayout screen={"Login"}>
      <View style={{ flex: 7, padding: 12 }}>
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.linkView}>
          <Text>Don't have an account?</Text>
          <Link style={{ fontWeight: "500", color: "blue" }} href="/Register">
            Register
          </Link>
        </View>

        <Button title="Login" />
      </View>
    </AuthLayout>
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