import { Link } from "expo-router";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import AuthLayout from "./Layouts/AuthLayout";

export default function LoginScreen() {
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
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 12,
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
});
