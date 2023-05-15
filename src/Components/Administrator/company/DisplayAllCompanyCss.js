import { makeStyles } from "@material-ui/core";

export const useStyles=makeStyles({

box:{
 width:'90%',
 height:'250',
 padding:10,

 background:'#fff'   
},
dialogContainer:{
   display:'flex',
  paddingLeft:'10%',
   width:'100vw',
   height:'100vh',
  
},
dialogBox:{
    width:'60%',
    height:540,
    padding:10,
    borderRadius:10,
   
    background:'#fff'
},
headingStyle:{
    fontWidth:24,
    fontWeight:'bold',
    letterSpacing:1,
    paddingTop:5,
    paddingBottom:5

 },

 center:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center'
 }

})