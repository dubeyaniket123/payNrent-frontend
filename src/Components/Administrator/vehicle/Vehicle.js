import { useStyles } from "./VehicleCss";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState,useEffect } from "react";
import { getData, ServerURL, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export default function Vehicle(props){

   const classes=useStyles();
   const navigate=useNavigate();
   const [categoryId,setCategoryId]=useState('');
   const [subCategoryId,setSubCategoryId]=useState('');
   const [companyId,setCompanyId]=useState('');
   const [modelId,setModelId]=useState('');
   const [vehicleId,setVehicleId]=useState('')
   const [categoryList,setCategoryList]=useState([])
   const [vendorId,setVendorId]=useState('')
   const [registrationNO,setRegistrationNo]=useState('')
   const [color,setColor]=useState('')
   const [fuelType,setFuelType]=useState('')
   const [ratings,setRatings]=useState('')
   const [average,setAverage]=useState('')
   const [remark,setRemark]=useState('') 
   const [capacity,setCapacity]=useState('')
   const [status,setStatus]=useState('')
   const [feature,setFeature]=useState('')
   const [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
   const [subCategoryList,setSubCategoryList]=useState([])
   const [modelList,setModelList]=useState([])
   const [companyList,setCompanyList]=useState([])

   const fetchAllCategory=async()=>{
   var result= await getData('category/display_all_category')
   setCategoryList(result.data)
   }
   useEffect(function(){
    fetchAllCategory()
   },[])
   const fetchAllSubcategoryByCategory=async(cid)=>{
   var response=await postData('company/fetch_all_subcategory_by_category',{categoryid:cid})
   setSubCategoryList(response.data);
   }
   const fetchAllCompanyBySubCategory=async(sid)=>{
    var response=await postData('model/fetch_all_company_by_subcategory',{subcategoryid:sid})
   setCompanyList(response.data);
   }
   const fetchAllModelByCommpany=async(coid)=>{
    var response=await postData('model/fetch_all_model_by_company',{companyid:coid})
    setModelList(response.data);
   }
   const handleChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubcategoryByCategory(event.target.value)

   }
   const handleSubChange=(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllCompanyBySubCategory(event.target.value)

   }
   const handleComChange=(event)=>{
    setCompanyId(event.target.value)
    fetchAllModelByCommpany(event.target.value)

   }
   const handleModChange=(event)=>{
    setModelId(event.target.value)

   }
   const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{
        return (
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> 
        )
    })
   }
   const fillSubCategoryDropDown=()=>{
    return subCategoryList.map((item)=>{
      return(
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })

   }
   const fillCompanyDropDown=()=>{
    return companyList.map((item)=>{
      return(
        <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
      )
    })

   }
   const fillModelDropDown=()=>{
    return modelList.map((item)=>{
      return(
        <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
      )
    })
     
   }
   const handleFuelType=(event)=>{
    setFuelType(event.target.value)
   }
   const handleRating=(event)=>{
    setRatings(event.target.value)
   }

   const handlestatusChange=(event)=>{
    setStatus(event.target.value)
    }
const handlePicture=(event)=>{
setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 


}
const handleSubmit=async()=>{
  var formData=new FormData()
  formData.append('vehicleid',vehicleId)
  formData.append('categoryid',categoryId)
  formData.append('subcategoryid',subCategoryId)
  formData.append('companyid',companyId)
  formData.append('modelid',modelId)
  formData.append('vendorid',vendorId)
  formData.append('registrationno',registrationNO) 
  formData.append('color',color)
  formData.append('fueltype',fuelType)
  formData.append('ratings',ratings)
  formData.append('average',average)
  formData.append('remark',remark)
  formData.append('capacity',capacity)
  formData.append('status',status)
  formData.append('feature',feature)
  formData.append('icon',icon.bytes)
  var response=await postData('vehicle/submitvehicle',formData)
  if(response.status)
  {
   Swal.fire({
     icon: 'success',
     title: 'Done',
     text: 'vehicle Submitted Successfully'
     
   })

  }
  else
  {
   Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!',
   
   })

  }

}
const showDisplayallvehicle=()=>{
  navigate("/dashboard/displayallvehicle")
}
   return(
    <div className={classes.mainContainter}>
        <div className={classes.box}>
        <Grid container spacing={2}>
             <Grid item xs={12} className={classes.headingStyle}>
             <div className={classes.center}>
               <ListAltIcon onClick={showDisplayallvehicle} />
               <div style={{ marginLeft: 5 }}>vehicle Interface</div>
             </div>
           </Grid>
           <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Select Category"
                onChange={handleChange}
              >
              {fillCategoryDropDown()}
              </Select>
            </FormControl>
           </Grid>

        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryId}
                label="Select SubCategory"
                onChange={handleSubChange}
              >
              {fillSubCategoryDropDown()}
              </Select>
            </FormControl>

        </Grid>
       
        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyId}
                label="Select Company"
                onChange={handleComChange}
              >
              {fillCompanyDropDown()}
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Model
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modelId}
                label="Select Company"
                onChange={handleModChange}
              >
              {fillModelDropDown()}
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setVendorId(event.target.value)} 
           label="Vendor Id" fullWidth />

        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setRegistrationNo(event.target.value)} 
           label="Registration No" fullWidth />

        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setColor(event.target.value)} 
           label="Color" fullWidth />

        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select fuelType
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fuelType}
                label="Select FuelType"
                 onChange={handleFuelType}
              >
             <MenuItem value="Petrol">Petrol</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="CNG">CNG</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Ratings
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ratings}
                label="Select Ratings"
                onChange={handleRating}
              >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setAverage(event.target.value)} 
           label="Average" fullWidth />

        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setRemark(event.target.value)} 
           label="Remarks" fullWidth />

        </Grid>
        <Grid item xs={3}>
           <TextField onChange={(event)=>setCapacity(event.target.value)} 
           label="Capacity" fullWidth />

        </Grid>
        <Grid item xs={6}>
           <TextField onChange={(event)=>setFeature(event.target.value)} 
           label="Feature" fullWidth />
        </Grid>
        <Grid item xs={6}>
        <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={status}
                   onChange={handlestatusChange}
                   >
                  <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                  <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                  </RadioGroup>
                  </FormControl>

        </Grid>
        <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="vehicle Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 56 }}
      />
        </Grid>

        
        <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
            Submit
         </Button>   
        </Grid>

            <Grid item xs={6}>
               <Button   variant="contained" fullWidth >
                    Reset
               </Button>    
            </Grid>
             </Grid>
        </div>
    </div>
   )

}