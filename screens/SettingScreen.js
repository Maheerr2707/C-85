import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends Component{

    constructor(){
        super()
      this.state={emailId:"", FirstName:"", LastName:"", Address:"", Contact:"", DocId:""}  
    }

getUserDetail=()=>{
    var user = firebase.auth().currentUser
    var email = user.email
    db.collection("users").where("email_id","==",email).get()
    .then((snapshot)=>{
snapshot.forEach((doc)=>{
   var data = doc.data()
   this.setState({
       emailId:data.email_id,FirstName:data.first_name,LastName:data.last_name,Address:data.address,Contact:data.contact,DocId:doc.id
   })
})
    })
}
componentDidMount(){
    this.getUserDetail()
}
updateUserDetails=()=>{
    db.collection("users").doc(this.state.DocId)
    .update({first_name:this.state.FirstName, last_name:this.state.LastName, address:this.state.Address, contact:this.state.Contact})
    Alert.alert("Profile Successfully Updated")
}
    render(){
        return(
       <View style={styles.conatiner}>
                <MyHeader
        title='Settings'  
        navigation={this.props.navigation}  
                />
<View style={styles.formContainer}>
<TextInput  styles={styles.formTextInput} 
   placeholder="First Name"
   maxLength={10}
   onChangeText={(text)=>{
       this.setState({
           FirstName:text
       })
   }}
value={this.state.FirstName}
/>

<TextInput  styles={styles.formTextInput} 
   placeholder="First Name"
   maxLength={10}
   onChangeText={(text)=>{
       this.setState({
           FirstName:text
       })
   }}
value={this.state.FirstName}
/>

<TextInput  styles={styles.formTextInput} 
   placeholder="Last Name"
   maxLength={10}
   onChangeText={(text)=>{
       this.setState({
            LastName:text
       })
   }}
value={this.state.LastName}
/>

<TextInput  styles={styles.formTextInput} 
   placeholder="Contact"
   maxLength={10}
   KeyboardType={"numeric"}
   onChangeText={(text)=>{
       this.setState({
          Contact:text
       })
   }}
value={this.state.Contact}
/>

<TextInput  styles={styles.formTextInput} 
   placeholder="Address"
   multiline={true}
   onChangeText={(text)=>{
       this.setState({
        Address:text
       })
   }}
value={this.state.Address}
/>

<TouchableOpacity style={styles.button}
  onPress={()=>{
      this.updateUserDetails()
  }}
>
    <Text style={styles.buttonText}>
Save
    </Text>
</TouchableOpacity>

</View>
    <Text>
       Setting Screen         
    </Text>       
     </View>
        )
    }
}

const styles = StyleSheet.create({ 
container : { flex:1, alignItems: 'center',justifyContent: 'center'},
formContainer:{ flex:1, width:'100%', alignItems: 'center' },
formTextInput:{ width:"75%", height:35, alignSelf:'center',borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, },
shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 },
buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })