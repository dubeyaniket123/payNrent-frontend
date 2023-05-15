import { useStyles } from "./CompanyCss";
import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { getData, ServerURL, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";




export default function Company(props) {
  const classes = useStyles();
  var [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  var [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });
  const [companyName, setCompanyName] = useState("");

  const navigate=useNavigate()

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fetchAllSubCategory = async (cid) => {
    var result = await postData("company/fetch_all_subcategory_by_category", {categoryid: cid});
    setSubCategoryList(result.data);
  };

  const handleChange2 = (event) => {
    setSubCategoryId(event.target.value);
  };

  const fillSubCategoryDropDown = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };
  const handleChange = (event) => {
    setCategoryId(event.target.value);
    fetchAllSubCategory(event.target.value);
  };
  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handlepicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subCategoryId);
    formData.append("companyname", companyName);
    formData.append("icon", icon.bytes);

    var response = await postData("company/companysubmit", formData);
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
    setCategoryId("");
    setSubCategoryId("");
    setCompanyName("");
    setIcon({ filename: "defaultcar.png", bytes: "" });
  };
  const handledisplayallcompany=()=>{
    navigate("/dashboard/displayallcompany")
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.headingStyle}>
            <div className={classes.center}>
              <ListAltIcon onClick={handledisplayallcompany} />
              <div style={{ marginLeft: 5 }}>Company Interface</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Age"
                onChange={handleChange}
              >
                {fillCategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryId}
                label="Age"
                onChange={handleChange2}
              >
                {fillSubCategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(event) => setCompanyName(event.target.value)}
              label="Company Name"
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
              alt="Company Icon "
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
