import React from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserDetailsDrawer from "./UserDetailsDrawer";
import { postData } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OtpInterface(props) {
  var [txtOne, setTxtOne] = useState("");
  var [txtTwo, setTxtTwo] = useState("");
  var [txtThree, setTxtThree] = useState("");
  var [txtFour, setTxtFour] = useState("");
  var [seconds, setSeconds] = useState(true);
  var [time, setTime] = useState(10);
  var [refresh, setRefresh] = useState(false);
  var [userDetails, setUserDetails] = useState({});
  var [inputOtp, setInputOtp] = useState("");
  var [status, setStatus] = useState(false);
  var interval;
  var navigate = useNavigate("");
  var dispatch = useDispatch("");

  const fetchUserDetails = async () => {
    var result = await postData("user/check_user_mobileno", {
      mobileno: props.mobile,
    });
    setUserDetails(result);
  };
  const handleStatus = () => {
    setStatus(false);
  };

  useEffect(function () {
    myTimer();
    fetchUserDetails();
  }, []);

  const myTimer = () => {
    if (seconds) {
      var t = time;
      interval = setInterval(() => {
        if (t >= 1) {
          t = t - 1;

          setTime(t);
        } else {
          clearInterval(interval);
          setSeconds(false);
        }
      }, 1000);
      setRefresh(!refresh);
    }
  };

  const handleTextOneChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtOne(event.target.value);
      document.getElementById("t2").focus();
    }
  };
  const handleTextTwoChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtTwo(event.target.value);
      document.getElementById("t3").focus();
    }
  };
  const handleTextThreeChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtThree(event.target.value);
      document.getElementById("t4").focus();
    }
  };
  const handleTextFourChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtFour(event.target.value);
      setInputOtp(txtOne + txtTwo + txtThree + event.target.value);
      props.onChange(txtOne + txtTwo + txtThree + event.target.value);
    }
  };
  const verifyOtp = () => {
    alert(props.getOtp + " " + props.generatedOtp);
    if (props.getOtp == props.generatedOtp) {
      if (userDetails.status) {
        dispatch({
          type: "ADD_USER",
          payload: [props.mobile, userDetails.data],
        });
        navigate("/bookingsummary");
        props.handleStatus();
      } else {
        setStatus(true);
        // props.handleClose()
      }
    } else {
      alert("incorrect");
    }
  };

  return (
    <div>
      <Grid container spacing={3} style={{ width: 300, padding: 20 }}>
        <Grid item xs={3}>
          <TextField
            id="t1"
            InputProps={{ style: { fontFamily: "poppins", fontWeight: 900 } }}
            onChange={handleTextOneChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="t2"
            InputProps={{ style: { fontFamily: "poppins", fontWeight: 900 } }}
            onChange={handleTextTwoChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="t3"
            InputProps={{ style: { fontFamily: "poppins", fontWeight: 900 } }}
            onChange={handleTextThreeChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="t4"
            InputProps={{ style: { fontFamily: "poppins", fontWeight: 900 } }}
            onChange={handleTextFourChange}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ fontSize: 10 }}>
            {seconds ? (
              <div> waiting for otp...{time}</div>
            ) : (
              <div style={{ cursor: "pointer" }} onClick={props.GenerateOtp}>
                Resend Otp
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button style={{
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                  color: "#fff",
                  fontFamily: "inherit",
                }} onClick={verifyOtp} fullWidth variant="contained">
            verify
          </Button>
        </Grid>
      </Grid>
      <UserDetailsDrawer
        status={status}
        mobile={props.mobile}
        handleStatus={handleStatus}
      />
    </div>
  );
}
