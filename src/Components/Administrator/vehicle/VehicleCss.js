import { makeStyles } from "@material-ui/core";
export const useStyles=makeStyles({
    mainContainter:{
     display:'flex',
    paddingLeft:'16%',
     height:'100vh',
     width:'100vw'

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