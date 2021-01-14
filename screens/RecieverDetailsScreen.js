import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';

  import firebase from 'firebase'
  import {Card,Header,icon} from 'react-native-elements'
import { render } from 'react-dom';


export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId:firebase.auth().currentUser.email(),
            RecieverID:this.props.navigation.getParam("details")['user_id'],
            RequestID:this.props.navigation.getParam("details")["request_id"],
            BookName:this.props.navigation.getParam("details")["book_name"],
            ReasonToRequest:this.props.navigation.getParam("details")["reason_to_request"],
            RecieverName:"", RecieverContact:"", RecieverAddress:"", RecieverRequestDocID:""
}  
    }
  getRecieverDetails=()=>{
      db.collection("users").where("email_id","==",this.state.RecieverID).get()
      .then((snapshot)=>{
           snapshot.forEach((doc)=>{
                this.setState({
                    RecieverName:doc.data().first_name,
                    RecieverContact:doc.data().contact,
                    RecieverAddress:doc.data().address
                })
           })  
      })
  }

updateBookStatus=()=>{
db.collection("All_Donations").add({
   book_name:this.state.BookName,
   request_id:this.state.RequestID, 
   requested_by:this.state.recieverName, 
   donor_id:this.state.UserId, 
   request_status:"donor interested"
  })
}

addNotification=()=>{
var message = this.state.username+"Has shown interest in donating the book"
  db.collection("All_Notification").add({
    taregeted_user_id: this.state.RecieverID, 
    donor_id:this.state.UserId,
    request_id:this.state.RequestID,
    book_name: this.state.BookName,
    date:firebase.firestore.FieldValue.serverTimestamp(),
    notification_status:"unread", 
    message:message
  })
}

componentDidMount(){
  this.getRecieverDetails()
  this.getUserDetails(this.state.UserId)
}

getUserDetails=(UserId)=>{
   db.collection('users').where("email_Id","==",UserId).get()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{this.setState({
       username:doc.data().first_name+" "+doc.data().last_name
     })})
   })
}

render(){
    return(
        <View style={styles.container}>
<View style={{flex:0.1}}>
<Header leftComponent={<Icon name="arrow_left" type="feather" color="#696969" onPress={()=>{
    this.props.navigation.goBack()
}}/>}
centerComponent={{text:"donate books", style:{color:"#90A5A9",fontSize:20,fontWeight:"bold"}}}
backgroundColor="#EAF8FE"
 />
</View>
<View style={{flex:0.3}}>
<Card title={"Book Infromation"}
    titleStyle={{fontSize:20}}>   
  <Card>
     <Text style={{fontWeight:bold}}>
      Name:{this.state.BookName}   
        </Text> 
      </Card> 

      <Card>
     <Text style={{fontWeight:bold}}>
      Request:{this.state.ReasonToRequest}   
        </Text> 
      </Card>   

</Card>

   <Card title={"Reciever Information"} titleStyle={{fontSize:20}}>
   <Card>
     <Text style={{fontWeight:bold}}>
      Name:{this.state.RecieverName}   
        </Text> 
      </Card>   
   </Card>

   <Card>
     <Text style={{fontWeight:bold}}>
      Contact:{this.state.RecieverContact}   
        </Text> 
      </Card> 

      <Card>
     <Text style={{fontWeight:bold}}>
      Address:{this.state.RecieverAddress}   
        </Text> 
      </Card>   

</View>
  <View style={styles.buttonContainer}>
{this.state.RecieverID!==this.state.UserId
?(<TouchableOpacity style={styles.button} onPress={()=>{
  this.updateBookStatus()
  this.addNotification()
  this.props.navigation.navigate("MyDonation")
}}>
  <Text>
    I want to Donate
  </Text>
  </TouchableOpacity>)
:null
}
  </View>
        </View>
    )
}
  }
  
  const styles = StyleSheet.create({ 
    container: { flex:1, },
buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' },

button:{
   width:200,
   height:50,
   justifyContent:'center',
   alignItems : 'center',
   borderRadius: 10,
   backgroundColor: 'orange',
   shadowColor: "#000", 

   shadowOffset:{ width: 0, height: 8 }, elevation : 16 } })