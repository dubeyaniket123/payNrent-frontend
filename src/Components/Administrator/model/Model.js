import { ClassNames } from "@emotion/react";
import { useStyles } from "../company/CompanyCss";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState,useEffect } from "react";
import { getData, ServerURL, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";


export default function Model(props){
const classes=useStyles();
var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
 var  [companyId,setCompanyId]=useState('')
 var  [modelId,setModelId]=useState('')
 var  [categoryId,setCategoryId]=useState('')
 var  [subcategoryId,setSubCategoryId]=useState('')
 var  [modelName,setModelName]=useState('')
 var  [year,setYear]=useState('')
 var [categoryList,setCategoryList]=useState([])
 var[subCategoryList,setSubCategoryList]=useState([])
 var[companyList,setCompanyList]=useState([])

 const navigate=useNavigate();
 
 const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
   }
   useEffect(function(){
    fetchAllCategory()
   },[])
  
   const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{
  
       return (
               <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
  
       )
  
    })
  
  }
  const fetchAllSubcategoryByCategory=async(category_id)=>{
    var body={categoryid:category_id}
    var response=await postData('company/fetch_all_subcategory_by_category',body)
    setSubCategoryList(response.data)
 }
 
 const fillSubCategoryDropDown=()=>{
   return subCategoryList.map((item)=>{
 
     return(
       <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
     )
   })
 }

 const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
  var body={subcategoryid:subcategory_id}
  var response=await postData('model/fetch_all_company_by_subcategory',body)
  setCompanyList(response.data)
}

const fillCompanyDropDown=()=>{
 return companyList.map((item)=>{

   return(
     <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
   )
 })
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
       
        }
      
 const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
   
   
    }

const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('modelid',modelId)
    formData.append('companyid',companyId)
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subcategoryId)
    formData.append('modelname',modelName)
    formData.append('year',year)
    formData.append('icon',icon.bytes)
    var response=await postData('model/modelsubmit',formData)
    if(response.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Model Submitted Successfully'
       
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
  const handleShowModelList=()=>{
    navigate("/dashboard/displayallmodel");
  }

 
return(<div className={classes.mainContainer}>
    <div className={classes.box}>
    <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
        <div className={classes.center}>
        <ListAltIcon onClick={handleShowModelList} />
              <div style={{ marginLeft: 5 }}>Model Interface</div>
        </div>
        </Grid>
        <Grid item xs={4}>
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

        <Grid item xs={4}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategoryId}
                label="Select SubCategory"
                onChange={handleSubChange}
              >
              {fillSubCategoryDropDown()}
              </Select>
            </FormControl>

        </Grid>
       
        <Grid item xs={4}> 
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
        <Grid item xs={6}>
           <TextField onChange={(event)=>setModelName(event.target.value)} label="Model Name" fullWidth />

        </Grid>
        <Grid item xs={6}>
           <TextField onChange={(event)=>setYear(event.target.value)} label="Year" fullWidth />

        </Grid>
       
       
        <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
      </Button>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="Model Icon"
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
 </div>)
}