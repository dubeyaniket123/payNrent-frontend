import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@mui/styles";
import { Flexbox } from "@mui/system";
export const useStyles=makeStyles({

mainContainer:{
    display:'flex',
   
    width:'100%',
    height:'100vh',
   paddingLeft:'16%'

},
box:{
   
    width:'50%',
    height:'250 ',
    background:'#fff',
    padding:10,
    borderRadius:10,
  
},
headingStyle:{
    fontWidth:24,
    fontWeight:'bold',
    letterspacing:1,
    paddingTop:5,
    paddingBottom:5
   
   },
   center:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center'
    
    }







})

