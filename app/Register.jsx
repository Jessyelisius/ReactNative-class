import React from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import AuthLayout from "./Layouts/AuthLayout";

const Register = () => {
  return (
    <AuthLayout screen={"Register"}>
      <View style={{ flex: 7, padding: 12 }}>
        {/* username */}
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
          />
        </View>
        {/* email */}
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        {/* password */}
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        {/* confirm password */}
        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.linkView}>
          <Text>Already have an account?</Text>
          <Link style={{ fontWeight: "500", color: "blue" }} href="/login">
            Login
          </Link>
        </View>

        <Button title="Register" />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
});

export default Register;