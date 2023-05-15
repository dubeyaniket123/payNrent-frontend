import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useStyles } from "./CategoryCss";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { ServerURL, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Category(props) {
  const classes = useStyles();
  var [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });

  var Navigate=useNavigate();

  var [categoryName, setCategoryName] = useState("");
  const handlepicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryname", categoryName);
    formData.append("icon", icon.bytes);
    var response = await postData("category/categorysubmit", formData);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Category submitted Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const clearValues = () => {
    setCategoryName("");
    setIcon({ filename: "defaultcar.png", bytes: "" });
  };
  const handleShowCategoryList=()=>{
 
    Navigate('/dashboard/displayallcategory')
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.headingStyle}>
          <div className={classes.center}>
          <ListAltIcon onClick={handleShowCategoryList} />
          <div style={{marginLeft:5}}>    
          
            Category Interface
            </div>
            </div> 
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(event) => setCategoryName(event.target.value)}
              label="Category Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handlepicture}
              />
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.center}>
            <Avatar
              alt="Category Icon "
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
            <Button onClick={clearValues} fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
