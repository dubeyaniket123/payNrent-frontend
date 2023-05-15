import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { getData, ServerURL, postData } from "../../services/FetchNodeServices";
import { useStyles } from "./SubCategoryCss";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Navigate, useNavigate } from "react-router-dom";
export default function SubCategory(props) {
  const classes = useStyles();
  var navigate = useNavigate();
  var [subcategoryName, setSubCategoryName] = useState("");
  var [categoryId, setCategoryId] = useState("");
  var [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });
  const [prio, setPrio] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const clearValues = () => {
    setSubCategoryName("");
    setPrio("");
    setCategoryId("");
    setIcon({ filename: "defaultcar.png", bytes: "" });
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
    formData.append("subcategoryname", subcategoryName);
    formData.append("priority", prio);
    formData.append("icon", icon.bytes);
    var response = await postData("subcategory/subcategorysubmit", formData);
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
  const handleShowSubCategoryList = () => {
    navigate("/dashboard/displayallsubcategory");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.headingStyle}>
            <div className={classes.center}>
              <ListAltIcon onClick={handleShowSubCategoryList} />
              <div style={{ marginLeft: 5 }}>SubCategory Interface</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select category
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
            <TextField
              onChange={(event) => setSubCategoryName(event.target.value)}
              label="subcategory Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]{1}" }}
              onChange={(event) => setPrio(event.target.value)}
              label="priority"
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
              alt="SubCategory Icon "
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
