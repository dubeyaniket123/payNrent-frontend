import { useStyles } from "./DisplayAllModelCss";
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Avatar, Button, TextField, Grid } from "@mui/material";
import { getData, postData, ServerURL } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

export default function DisplayAllModel(props){

    const classes=useStyles();
    const navigate=useNavigate();
    const [categoryId,setCategoryId]=useState("");
    const [subCategoryId,setSubCategoryId]=useState("")
    const [companyId,setCompanyId]=useState("")
    const [modelId,setModelId]=useState("")
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [companyList,setCompanyList]=useState([])
    const [modelName,setModelName]=useState("")
    const [year,setYear]=useState("")
    const [model,setModel]=useState([])
    const [icon,setIcon]=useState({  filename: "/assets/defaultcar.png",
    bytes: "",})
    const [oldIcon,setOldIcon]=useState('');
    const [open,setOpen]=useState(false);
    const [prevIcon,setPrevIcon]=useState('')
    const [buttonStatus, setButtonStatus] = useState({ upload: true });

    const fetchAllCategory=async()=>{
    var result=await getData("category/display_all_category");
    setCategoryList(result.data)

    }

    const fetchAllSubCategory=async()=>{
        var result=await getData("subcategory/display_all_subcategory")
        setSubCategoryList(result.data)
    }
    const fetchAllCompany= async()=>{
        var result=await getData("company/display_all_company");
        setCompanyList(result.data)
     }
     const fetchAllModel=async()=>{
        var result=await getData("model/display_all_model")
        setModel(result.data)
     }
     useEffect(function () {
        fetchAllModel();
      }, []);

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

     const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategoryByCategory(event.target.value)
     } 
     const handleSubChange=(event)=>{
         setSubCategoryId(event.target.value)
         fetchallAllCompanyBySubcategory(event.target.value)
     }
     const handleComChange=(event)=>{
       setCompanyId(event.target.value);

     }

     const fetchAllSubcategoryByCategory=async(cid)=>{
        var result = await postData("company/fetch_all_subcategory_by_category", {categoryid: cid});
        setSubCategoryList(result.data);

     }
     const fetchallAllCompanyBySubcategory=async(sub)=>{
        var result= await postData("model/fetch_all_company_by_subcategory", {subcategoryid:sub});
        setCompanyList(result.data)
     }
     const showHidePictureButtons=()=>
   {
    return (<div>
      {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
        Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file"  />
      </Button></>:<><Button onClick={handleSavePicture} color="primary">Save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}

    </div>)
   }

   const handleClose=()=>{
    setOpen(false)
   }
   const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: "" });
    setButtonStatus({ upload: false });
  };
   
   const handlePicture=(event)=>{
     setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
     setButtonStatus({upload:false})
   
   }
   const handleEditData=async()=>{
    var body={modelname:modelName,categoryid:categoryId,subcategoryid:subCategoryId,companyid:companyId}
    var response=await postData('model/edit_data',body)
    if(response.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Company Updated Successfully'
       
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
    
    setOpen(false)
    fetchAllCompany()
 
 
  
 
  
    }

    const handleDelete=async()=>{
      var body={modelid:modelId,oldicon:oldIcon}
      var response=await postData('model/delete_data',body)
      if(response.status)
      {
       Swal.fire({
         icon: 'success',
         title: 'Done',
         text: 'Company Deleted Successfully'
         
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
      
      setOpen(false)
      fetchAllModel()
   
    }
    
   
    

  const handleSavePicture=async()=>{
    var formData=new FormData()
    formData.append('modelid',modelId)
    formData.append('oldicon',oldIcon)
    formData.append('icon',icon.bytes)
    var response=await postData('model/edit_picture',formData)
    if(response.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Icon Updated Successfully'
       
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
    setButtonStatus({upload:true})
    setOpen(false)
    fetchAllModel()
 
  }

    const handleSetDataForDialog=(rowData)=>{
        fetchAllCategory();
        fetchAllSubCategory();
        fetchAllCompany(); 
    setSubCategoryId(rowData.subcategoryid);
    setCategoryId(rowData.categoryid);
    setCompanyId(rowData.companyid);
    setModelName(rowData.companyname);
    setYear(rowData.year);
    setModelId(rowData.modelid)
    setOldIcon(rowData.icon);
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: "" });
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`);
    setOpen(true);

      }

    function displayModel() {
        return (
          <MaterialTable
            title="List of Models"
            columns={[
                { title:'Model Id', field: 'modelid' },
              { title: 'Category Id', field: 'categoryname' },
              { title: 'SubCategory Id', field: 'subcategoryname' },
              { title:'Company Id', field: 'companyname' },
              { title: 'Model Name', field: 'modelname' },
              { title: 'Year', field: 'year' },
              { title: 'Icon', field: 'icon',render:(rowData)=> <Avatar src={`${ServerURL}/images/${rowData.icon}`}style={{width:40,height:40}} variant="rounded" />},
              

            ]}
            data={model}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Model',
                onClick: (event, rowData) =>handleSetDataForDialog(rowData)
              },
              {
                icon: "add",
                tooltip: "Add model",
                isFreeAction: true,
                onClick: (event) => navigate("/dashboard/model"),
              },
             
            ]}
          />
        )
      }
      const showDialog=()=>{
        return(
         <div>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div className={classes.mainContainer}>
              <div className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.headingStyle}>
                    Model Interface
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
                        label="Category"
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
                        value={subCategoryId}
                        label="Category"
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
                        label="Category"
                        onChange={handleComChange}
                      >
                        {fillCompanyDropDown()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={modelName}
                      onChange={(event) =>
                        setModelName(event.target.value)
                      }
                      label="Model Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={year}
                      onChange={(event) =>
                        setYear(event.target.value)
                      }
                      label="Year"
                      fullWidth
                    />
                  </Grid>
                 

                  <Grid item xs={6}>
                    {showHidePictureButtons()}
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <Avatar
                      alt="Company Icon"
                      src={icon.filename}
                      variant="rounded"
                      sx={{ width: 120, height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={handleEditData}
                      variant="contained"
                      fullWidth
                    >
                      Edit Data
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      onClick={handleDelete}
                      variant="contained"
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

         </div>

        )
      }

      return (
        <div className={classes.dialogContainer}>
          <div className={classes.dialogBox}>{displayModel()}</div>
         { showDialog() } 
        </div>
      );

    

}