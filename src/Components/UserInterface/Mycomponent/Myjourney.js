import React from "react";
import Stack from '@mui/material/Stack';

import { Box } from "@material-ui/core";

export default function Myjourney(props){

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
                <Box sx={{textAlign:"left"}} >
                <div>
      <img src="assets/smile.png" width="80px" height="80px" />
      <h2 style={{lineHeight:0.2}}>1 Mn +</h2>
                  <p>Happy Customer</p>
      </div>
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
      <img src="assets/location.png" width="80px" height="80px" />
      <h2 style={{lineHeight:0.2}}>22+ cities</h2>
                  <p>Across India</p>
      </div>
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
      <img src="assets/car.png" width="80px" height="80px" />
      <h2 style={{lineHeight:0.2}}>50 Mn +</h2>
                  <p>Kms travelled</p>
      </div>
    </Box>
    </Box>
    <Box  xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  
                }}>
                <Box sx={{textAlign:"left"}} >
                <div>
      <img src="assets/star.png" width="80px" height="80px" />
      <h2 style={{lineHeight:0.2}}>4.8 / 5</h2>
                  <p>20K+ reviewers</p>
      </div>
    </Box>
    </Box>

    </Stack>
    </div>
    )}
    return(
        <div style={{width:'100%'}}>
            <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10}}>
            <span style={{fontSize:28,fontWeight:'bolder',color:'#fff'}}>
                OUR JOURNEY
            </span>
            </div>
                {playSlide()}
            
            
        </div>
    )

}