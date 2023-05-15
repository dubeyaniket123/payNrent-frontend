import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { useStyles } from "./DisplayAllCategoryCss";
import { getData, postData, ServerURL } from "../../services/FetchNodeServices";
import { Avatar, Button, TextField, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { upload } from "@testing-library/user-event/dist/upload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props) {
  var classes = useStyles();
  const [category, setCategory] = useState([]);
  var [categoryName, setCategoryName] = useState("");
 
 var  [categoryID,setCategoryID]=useState('')
 var  [buttonStatus,setButtonStatus]=useState({upload:true})
  var [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });
  var [prevIcon, setPrevIcon] = useState("");
  const [oldIcon, setOldIcon] = useState("");
  var Navigate=useNavigate();

  const [open, setOpen] = useState(false);
  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategory(result.data);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleSetDataForDialog = (rowData) => {
    setCategoryID(rowData.categoryid);
    setOldIcon(rowData.icon);
    setCategoryName(rowData.categoryname);
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: "" });
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`);
    setOpen(true);
  };
  const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: "" }); 
    setButtonStatus({ upload: false });
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("oldicon", oldIcon);
    formData.append("categoryid", categoryID);
    formData.append("icon", icon.bytes);
    var response = await postData("category/edit_picture", formData);
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
    fetchAllCategory();
  };
  const handleEditData = async () => {
    var body = { categoryname: categoryName, categoryid: categoryID };

    var response = await postData("category/edit_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Catagory Updated Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    fetchAllCategory();
  };

  const handleDelete = async () => {
    var body = { categoryid: categoryID, oldicon: oldIcon };

    var response = await postData("category/delete_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Data deleted Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setOpen(false);
    fetchAllCategory();
  };

  const showHiddenPictureButtons = () => {
    return (
      <div>
        {buttonStatus.upload ? (
          <>
            {" "}
            <Button fullWidth variant="contained" component="label">
              Upload
              <input
                onChange={handlepicture}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </>
        ) : (
          <>
            <button onClick={handleSavePicture} color="primary">
              Save
            </button>
            <button onClick={handleDiscard} color="secondary">
              Discard
            </button>
          </>
        )}
      </div>
    );
  };
  const handlepicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setButtonStatus({ upload: false });
  };

  function displayCategories() {
    return (
      <MaterialTable
        title="List of Categories"
        columns={[
          { title: "CategoryId", field: "categoryid" },
          { title: "Name", field: "categoryname" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.icon}`}
                style={{ width: 60, height: 60 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={category}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit category",
            onClick: (event, rowData) => handleSetDataForDialog(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Category",
            isFreeAction: true,
            onClick: (event) => Navigate("/dashboard/category"),
          },
        ]}
      />
    );
  }
  const handleClose = () => {
    setOpen(false);
  };
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
            <div className={classes.box}>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.headingStyle}>
                  Category Interface
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    label="Category Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {showHiddenPictureButtons()}
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
                  <Button
                    onClick={handleEditData}
                    variant="contained"
                    fullWidth
                  >
                    Edit Data
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button onClick={handleDelete} fullWidth variant="contained">
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={classes.dialogContainer}>
      <div className={classes.dialogBox}>{displayCategories()}</div>
      {showDialog()}
    </div>
  );
}
