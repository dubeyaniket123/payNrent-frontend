import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import OtpInterface from "./OtpInterface";
import { getData, postData } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserDetailsDrawer(props) {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchor, setAnchor] = React.useState("right");

  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [aadhar, setAadhar] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [licence, setLicence] = React.useState("");

  const fetchUserDetails = async () => {
    var result = await postData("user/check_user_mobileno", {
      mobileno: props.mobile,
    });
    dispatch({ type: "ADD_USER", payload: [props.mobile, result.data] });
  };

  const handleSubmit = async () => {
    var body = {
      mobileno: props.mobile,
      emailid: email,
      fullname: userName,
      birthdate: dob,
      aadharnumber: aadhar,
      licenseno: licence,
    };
    var result = await postData("user/userdetailssubmit", body);
    if (result.status) {
      alert("registration done");
      props.handleStatus();
      setState({ ...state, ["right"]: false });
      fetchUserDetails();
      navigate("/bookingsummary");
    } else {
      alert("registration failed");
    }
  };

  React.useEffect(
    function () {
      setState({ ...state, ["right"]: props.status });
    },
    [props]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.handleStatus(open);

    setState({ ...state, ["right"]: open });
  };

  const list = (anchor) => (
    <Grid container spacing={3} style={{ width: 400, padding: 30 }}>
      <Grid item xs={12}>
        <img src="/assets/Logo1.png" style={{ width: 70, padding: 3 }} />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ textAlign: "center", width: 24, fontFamily: "poppins" }}
      >
        SignUp
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setMobile(event.target.value)}
          value={props.mobile}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "poppins" }}>
              Mobile Number...
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "poppins" }}>
              Email Address...
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setUserName(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "poppins" }}>
              Full Name...
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="date"
          onChange={(event) => setDob(event.target.value)}
          variant="outlined"
          fullWidth
          label={<span style={{ width: 24, fontFamily: "poppins" }}></span>}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setAadhar(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "poppins" }}>
              Aadhar Number...
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setLicence(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "poppins" }}>
              Licence Number...
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button
        style={{
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                  color: "#fff",
                  fontFamily: "inherit",
                }}
          onClick={handleSubmit}
          variant="contained"
          color="inherit"
          fullWidth
        >
          Proceed
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={props.status}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
