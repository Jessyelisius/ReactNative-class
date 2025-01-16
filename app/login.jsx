import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const login = () => {
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
  )
}

export default login

const styles = StyleSheet.create({})