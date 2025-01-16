import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const AddContactModal = ({visibility, setVisibility, AddContact, name, setname, phone, setphone}) => {
   
  return (

   <Modal transparent={true} animationType='fade' visible={visibility}>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Pressable onPress={()=>setVisibility(false)} style={{backgroundColor: "black", opacity:0.8, position:"absolute", width:"100%", height:"100%"}}/>
          
            <Pressable onPress={()=>Keyboard.dismiss()} style={styles.Body}>
                <Text style={{color: "gray", fontWeight:"700", fontSize: 20}}>Add Contact</Text>
                <TextInput placeholder='Name'autoCapitalize='words' defaultValue={name} onChangeText={setname} style={styles.TextInput}/>
                <TextInput placeholder='Phone' keyboardType="phone-pad" defaultValue={phone} onChangeText={setphone} style={styles.TextInput}/>

                 <TouchableOpacity onPress={()=>AddContact(name, phone)} style={styles.Button}><Text style={{color:"white", fontWeight:"bold"}} >Add Contact</Text></TouchableOpacity>
                
            </Pressable>
        </View>
   </Modal>
  )
}

export default AddContactModal

const styles = StyleSheet.create({

    Body:{
        width:"80%",
        backgroundColor:"white",
        padding:20,
        borderRadius: 7,
        alignItems: "center",
        gap:20
    },
    TextInput:{
        borderColor: "gray",
        borderWidth: 1,
        width: "100%",
        padding:10,
        borderRadius:5
    },
    Button:{
        height: 40,
        backgroundColor:"#02A9EA",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
    }
})