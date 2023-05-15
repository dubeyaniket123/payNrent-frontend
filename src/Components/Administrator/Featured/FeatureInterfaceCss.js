 import { makeStyles } from "@mui/styles";

 export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
       paddingLeft:'16%',
        width:'100vw',
        height:'100vh'
    
    
    },
    box:{
    
    
        width:'50%',
        height:'250',
        padding:10,
        borderRadius:10,
       
        background:'#fff'
    
    },
    headingStyle:{
     fontWidth:24,
     fontWeight:'bold',
     letterspacing:1,
     paddingTop:5,
     paddingBottom:5
    
    }  ,
    center:{
    display:'flex',
    justifyContent:'left',
    alignContent:'center',
    flexDirection:'row'
    
    }
    
 })