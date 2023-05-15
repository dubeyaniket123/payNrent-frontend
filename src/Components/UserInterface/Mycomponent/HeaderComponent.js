import React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { getData, postData } from "../../services/FetchNodeServices";
import DateDiff from "date-diff";
import { LocationOn } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

export default function HeaderComponent(props) {
 
 
  var bookingDetails=useSelector(state=>state.Booking)
  const [open, setOpen] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(bookingDetails?.city);
  const [startTime, setStartTime] = useState(bookingDetails?.starttime);
  const [endTime, setEndTime] = useState(bookingDetails?.endtime);


  const fetchAllCities = async () => {
    var response = await getData("user/display_all_cities");
    setCities(response.data);
  };

  const handleCitySelected = (citySelected) => {
    setSelectedCity(citySelected);
    setOpen(false);
  };

  const showTopCity = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "TopCity" ? (
            <ListItem button>
              <ListItemText
                style={{ fontSize: 18, fontWeight: "bold" }}
                primary={
                  <span style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.cityname}
                  </span>
                }
                onClick={() => handleCitySelected(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  const showOtherCity = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "OtherCity" ? (
            <ListItem button>
              <ListItemText
                style={{ fontSize: 18, fontWeight: "bold" }}
                primary={item.cityname}
                onClick={() => handleCitySelected(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  useEffect(function () {
    fetchAllCities();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCityDialog = () => {
    setOpen(true);
  };
  const handlesetStartTimeValue = (newValue) => {
    setStartTime(newValue);
   
  };
  const handlesetEndTimeValue = (newValue) => {
    setEndTime(newValue);
   

   
  };

  

  const cityDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { borderRadius: 20 },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {"Select your city"}

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ width: 350 }}>
            <List>
              <div>Top Cities</div>
              {showTopCity()}
              <div>Other Cities</div>
              {showOtherCity()}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div style={{ position: "static", }}>
    
      <Box>
      
        <AppBar color="inherit" style={{ position: "static" ,padding:5,}}>
        <div style={{marginLeft:150}}>
        <span style={{fontFamily:'poppins',fontWeight:400}}>Modify Search</span>
        </div>
          <Toolbar>
            <div
              style={{
                borderRadius: 20,
                width: 890,
                height: 30,
                display: "flex",
                border: "1px solid #bdc3c7",
                marginTop: 5,
                alignItems: "center",
              
                paddingTop: 10,
                paddingBottom: 10,
                marginLeft: 120,
              }}
            >
              <div
                onClick={handleCityDialog}
                style={{
                  cursor: "pointer",

                  padding: 10,
                  alignItems: "center",
                  display: "flex",
                  width: 230,

                  height: 30,
                }}
              >
                <LocationOn />
                <span
                  style={{ paddingLeft: 20, fontSize: 18, fontWeight: 600 }}
                >
                  {selectedCity}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: 400,
                }}
              >
                <div
                  style={{
                    cursor: "pointer",

                    padding: 10,
                    alignItems: "center",
                    display: "flex",
                    width: 190,
                    height: 30,

                    border: "1px solid #bdc3c7",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      InputProps={{ disableUnderline: true }}
                      label={
                        <span
                          style={{
                            fonntSize: 18,
                            fontWeight: 600,
                            color: "#7f8c8d",
                          }}
                        >
                          Start Time
                        </span>
                      }
                      value={startTime}
                      onChange={(newValue) => {
                        handlesetStartTimeValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div
                  style={{
                    cursor: "pointer",

                    padding: 10,
                    alignItems: "center",
                    display: "flex",
                    width: 160,
                    height: 30,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      InputProps={{ disableUnderline: true }}
                      label={
                        <span
                          style={{
                            fonntSize: 18,
                            fontWeight: 600,
                            color: "#7f8c8d",
                          }}
                        >
                          End Time
                        </span>
                      }
                      value={endTime}
                      onChange={(newValue) => {
                        handlesetEndTimeValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div
                style={{
                  cursor: "pointer",
                  marginLeft: 40,
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  width: 210,
                  height: 30,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{ fontSize: 24, fontWeight: "bolder", color: "#fff" }}
                >
                  Search
                </span>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {cityDialog()}
    </div>
  );
}
