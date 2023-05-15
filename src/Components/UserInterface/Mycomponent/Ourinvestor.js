import React from "react";
import Stack from '@mui/material/Stack';

import { Box } from "@material-ui/core";

export default function Ourinvestor(props){

    const playSlide=()=>{
        return(

    <div style={{
       height:220,width:"96%",backgroundColor:"white",borderRadius:20,paddingLeft:"18px",boxShadow:"0px 0px 10px -5px black",paddingTop:'60px'
    }}>
    <Stack  sx={{ display: "flex",justifyContent:"space-around" }}
              direction={{ xs: "column", sm: "column", md: "row" }}
              >
    <Box  xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft:50
                }}>
                <Box sx={{padding:"10px 0px",textAlign:"center"}} >
                <div>
      <img src="assets/hyundai.png" width="90px" height="90px" />
      </div>
      
                  <p>Hyundai Motor Company</p>
      
    </Box>
    </Box>
    <Box  xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding:"0px 60px"
                }}>
                <Box sx={{padding:"10px 0px",textAlign:"left"}}>
                <div>
      <img src="assets/edel.png" width="90px" height="90px" />
     </div>
                  <p>Edelweiss Financial Services</p>
     
    </Box>
    </Box>
    <Box  xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft:50
                }}>
                <Box sx={{textAlign:"left"}} >
                <div>
      <img src="assets/dream.png" width="90px" height="90px" />
     </div>
                  <p>Dream Incubator</p>
     
    </Box>
    </Box>
    <Box  xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft:50
                }}>
                <Box sx={{textAlign:"left"}} >
                <div>
      <img src="assets/beenext.png" width="90px" height="90px" />
      </div>
                  <p>Beenext</p>
     
    </Box>
    </Box>

    </Stack>
    </div>
    )}
    return(
        <div style={{width:'100%'}}>
            <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10}}>
            <span style={{fontSize:28,fontWeight:'bolder',color:'#fff'}}>
                OUR INVESTORS
            </span>
            </div>
                {playSlide()}
            
            
        </div>
    )

}