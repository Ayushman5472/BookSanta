import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class WelcomeScreen extends React.Component {
    constructor(){
        super()
        this.state={
        Password: "",
        EmailID: "",
        Age:0,
        ContactNumber:0,
        ConfirmPassword:"",
        Name:"",
        IsModalVisible: false,
        }
       }
       UserLogIn=(Email,Password)=>{
        firebase.auth().signInWithEmailAndPassword(Email,Password).then(()=>{
           return( alert("You have succefully logged in")
           )

        }).catch(error=>{
            return(alert(error.message))
        })
       }
       UserSignUp=(Email,Password,ConfirmPassword)=>{
           if (Password!== ConfirmPassword){
             return(  alert("Passwords do not match"))
           }else {
firebase.auth().createUserWithEmailAndPassword(Email, Password).then((response)=>{
    return(db.collection('UserDetails').add({
        Age:this.state.Age,
        ContactNumber:this.state.ContactNumber,
        EmailID:this.state.EmailID,
        Name:this.state.Name
    }), alert("You have succesfully Signed Up"))
       
    
}).catch(function(error){
    return(alert(error.message))
})
           }
       }
ShowModal=()=>{
    return(
    <Modal animationType="fade" transparent = {true} visible={this.state.IsModalVisible}>
        <View style={styles.modal}>
           <ScrollView style = {{width:"100%"}}>
               <KeyboardAvoidingView style = {styles.container}>
                   <Text>Sign Up Form</Text>
                   <TextInput placeholder = {"name"} onChangeText={text=>{
                       this.setState({
                           Name:text
                       })
                   }}></TextInput>
                   <TextInput placeholder = {"Phone Number"} keyboardType = {'numeric'} onChangeText = {number=>{
                       this.setState({
                           ContactNumber:number
                       })
                   }}></TextInput>
                                      <TextInput placeholder = {"Email ID"} keyboardType={'email-address'} onChangeText={text=>{
                       this.setState({
                           EmailID:text
                       })
                   }}></TextInput>
                                      <TextInput placeholder = {"Password"} secureTextEntry={true} onChangeText={text=>{
                       this.setState({
                           Password:text
                       })
                   }}></TextInput>
                                      <TextInput placeholder = {"Confirm Password"} secureTextEntry={true} onChangeText={text=>{
                       this.setState({
                           ConfirmPassword:text
                       })
                   }}></TextInput>
                                      <TextInput placeholder = {"Age"} keyboardType={'number-pad'} onChangeText={text=>{
                       this.setState({
                           Age:text
                       })
                   }}></TextInput>
                    <TouchableOpacity onPress={()=>{
                      this.UserSignUp (this.state.EmailID, this.state.Password, this.state.ConfirmPassword)
                   }}><Text>Register</Text></TouchableOpacity>
                   <TouchableOpacity onPress={()=>{
                       this.setState({
                           IsModalVisible:false,
                       })
                   }}><Text>Cancel</Text></TouchableOpacity>
               </KeyboardAvoidingView>
               </ScrollView>
        </View>
    </Modal>
    )
}

render(){ 
  return (
    <View style={styles.container}>
        {this.ShowModal()}
     <TextInput placeholder={"Email ID"} keyboardType={"email-address"} onChangeText={(text)=>{
         this.setState({
             EmailID:text
         })
     }}></TextInput>
     <TextInput secureTextEntry= {true} placeholder={"Password"} onChangeText={(text)=>{
         this.setState({
        Password:text 
         })
     }}></TextInput>
     <TouchableOpacity onPress={()=>
         this.setState({
             IsModalVisible:true,
         })
     }><Text>Sign Up</Text></TouchableOpacity>
     <TouchableOpacity onPress={()=>
         this.UserLogIn(this.state.EmailID, this.state.Password)     
     }><Text>Log In</Text></TouchableOpacity>

    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal:{
    flex: 1,
    borderRadius:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:20,
    marginLeft:20,
    marginBottom:80,
    marginTop:80,
  }
});
