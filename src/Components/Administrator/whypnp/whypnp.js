import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useStyles } from "./whypnpCss";


export default function Whypnp(props){
    const classes=useStyles()
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    const handlePicture=(event)=>{
       setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
      
       }
       const handleSubmit=async(event)=>{
        var formData= new FormData()
       formData.append('title',title)
       formData.append('description',description)
       formData.append('image',icon.bytes)
       var response=await postData('whypnp/whypnpsubmit',formData)
      if(response.status)
      {Swal.fire({
       icon: 'success',
       title: 'Done...',
       text: 'pnp submitted sucessfully!',
      
     })
     }
      else
      { Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Something went wrong!',
     
     })
     }
     }

     const clearValues=()=>{
        setTitle('')
        setDescription('')
        setIcon({filename:'/assest/Ofr.png',bytes:''})
        
        }
     return(<div className={classes.mainContainer}>
        <div  className={classes.box}> 
       <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingstyle}>
          <div className={classes.center}>
        
             <div style={{fontSize:23,fontWeight:'bold'}}>
         Pnp Interface
            </div>
            </div>
        </Grid>
    
    
        <Grid item xs={6}>
            <TextField onChange={(event)=>setTitle(event.target.value)} label="Title" fullWidth/>
        </Grid>
    
        <Grid item xs={6}>
            <TextField onChange={(event)=>setDescription(event.target.value)} label="Discription" fullWidth/>
        </Grid>
    
    
    
    
      <Grid item xs={6}>
      <Button  fullWidth variant="contained" component="label">
      Upload
      <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
    </Button>
    </Grid>
    
    
      <Grid item xs={6} className={classes.center}>
      <Avatar
      alt="category Icon"
      src={icon.filename}
      varient="rounded"
      sx={{ width: 120, height: 56 }}
        />
    
      </Grid>
    
    
    
      <Grid item xs={6}>
        <Button onClick={handleSubmit} variant='contained' fullWidth>
            Submit
        </Button>
    
      </Grid>
    
    
      <Grid item xs={6}>
        <Button   onClick={clearValues} variant='contained' fullWidth>
            Reset
        </Button>
    
      </Grid>
    
    
    
    
       </Grid>
       </div>
    </div>
    )
    
}