import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Avatar, Button, TextField, Grid } from "@mui/material";
import { getData, postData, ServerURL } from "../../services/FetchNodeServices";
import { useStyles } from "./DisplayAllSubCategoryCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory(props) {
  var classes = useStyles();
  const [subcategoryName, setSubCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [buttonStatus, setButtonStatus] = useState({ upload: true });
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [prevIcon, setPrevIcon] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState();
  const [oldIcon, setOldIcon] = useState("");
  var [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });
  var [priority, setPriority] = useState("");

  var Navigate = useNavigate();
  const fetchAllSubCategory = async () => {
    var result = await getData("subcategory/display_all_subcategory");
    setSubCategory(result.data);
  };
  useEffect(function () {
    fetchAllSubCategory();
  }, []);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };

  const handleSetDataForDialog = (rowData) => {
    fetchAllCategory();
    setSubCategoryId(rowData.subcategoryid);
    setCategoryId(rowData.categoryid);
    setSubCategoryName(rowData.subcategoryname);
    setPriority(rowData.priority);
    setOldIcon(rowData.icon);
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: "" });
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`);
    setOpen(true);
  };

  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };
  const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: "" });
    setButtonStatus({ upload: false });
  };
  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append("subcategoryid", subCategoryId);
    formData.append("oldicon", oldIcon);
    formData.append("icon", icon.bytes);
    var response = await postData("subcategory/edit_picture", formData);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Icon Updated Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setButtonStatus({ upload: true });
    setOpen(false);
    fetchAllSubCategory();
  };
  const handleEditData = async () => {
    var body = {
      subcategoryname: subcategoryName,
      categoryid: categoryId,
      subcategoryid: subCategoryId,
      priority: priority,
    };
    var response = await postData("subcategory/edit_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "SubCategory Updated Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setOpen(false);
    fetchAllSubCategory();
  };

  const handleDelete = async () => {
    var body = { subcategoryid: subCategoryId, oldicon: oldIcon };
    var response = await postData("subcategory/delete_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "SubCategory Deleted Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setOpen(false);
    fetchAllSubCategory();
  };
  const showHidePictureButtons = () => {
    return (
      <div>
        {buttonStatus.upload ? (
          <>
            <Button fullWidth variant="contained" component="label">
              Upload
              <input
                onChange={handlePicture}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleSavePicture} color="primary">
              Save
            </Button>
            <Button onClick={handleDiscard} color="secondary">
              Discard
            </Button>
          </>
        )}
      </div>
    );
  };
  const handlePicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setButtonStatus({ upload: false });
  };

  const handleSubChange = (event) => {
    setCategoryId(event.target.value);
  };

  function displaySubCategories() {
    return (
      <MaterialTable
        title="List of subcategories"
        columns={[
          { title: "SubCategory Id", field: "subcategoryid" },
          { title: "Category name", field: "categoryname" },
          { title: "Subcategory Name", field: "subcategoryname" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.icon}`}
                style={{ width: 40, height: 40 }}
                variant="rounded"
              />
            ),
          },
          { title: "Priority", field: "priority" },
        ]}
        data={subCategory}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit subCategory",
            onClick: (event, rowData) => handleSetDataForDialog(rowData),
          },
          {
            icon: "add",
            tooltip: "Add SubCategory",
            isFreeAction: true,
            onClick: (event) => Navigate("/dashboard/subcategory"),
          },
        ]}
      />
    );
  }

  const showDialog = () => {
    return (
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
                    SubCategory Interface
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
                    <TextField
                      value={subcategoryName}
                      onChange={(event) =>
                        setSubCategoryName(event.target.value)
                      }
                      label="SubCategory Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Priority"
                        onChange={handleSubChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    {showHidePictureButtons()}
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <Avatar
                      alt="SubCategory Icon"
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
    );
  };

  return (
    <div className={classes.dialogContainer}>
      <div className={classes.dialogBox}>{displaySubCategories()}</div>
      {showDialog()}
    </div>
  );
}
