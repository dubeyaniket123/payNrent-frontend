import { useEffect, useState } from "react";
import { Box, divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { fontSize } from "@mui/system";
import { LocationOn } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { getData } from "../../services/FetchNodeServices";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import DateDiff from "date-diff";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

export default function SeachComponent(props) {
  const [selectedCity, setSelectedCity] = useState("gwalior");
  const [open, setOpen] = useState(false);

  const [cities, setCities] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [daysTime, setDaysTime] = useState("");
  const [days,setDays]=useState('')
  const [hrs,setHrs]=useState('')
  var navigate=useNavigate()
  var dispatch=useDispatch()

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

  const handlesetStartTimeValue = (newValue) => {
    setStartTime(newValue);
   
  };
  const handlesetEndTimeValue = (newValue) => {
    setEndTime(newValue);
   

    dateDiff(newValue);
  };

  const dateDiff = (et) => {
    var startDay = new Date(startTime);
    var endDay = new Date(et);
    var diff = new DateDiff(endDay, startDay);
    var diff=new DateDiff(endDay,startDay)
    setDays(parseInt(diff.days()))
    setHrs(Math.ceil(diff.hours()%24))
    setDaysTime("Duration :"+parseInt(diff.days())+" Days "+Math.ceil(diff.hours()%24)+" Hrs");
   
  };
    
  const handleClick=()=>{
    if((days>=0 && hrs>0) ||(days>0 && hrs>=0)){
    dispatch({type:'ADD_BOOKING',payload:{city:selectedCity,starttime:startTime,endtime:endTime,duration:daysTime,days:days,hrs:hrs}})
    navigate('/vehicledetails')
    }
    else
    {
      alert("invalid date/time please choose correct date/time ")
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <img src="/assets/slide1.png" style={{ width: "100%" }} />

      <div style={{ position: "absolute", left: "5%", top: "4%" }}>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            padding: 20,
            borderRadius: 15,
            width: 500,
            height: 450,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              background: "#f39c12",
              width: 480,
              height: 90,
              borderRadius: 15,
            }}
          >
            <div style={{ position: "absolute", left: "5%", top: "19%" }}>
              <div style={{ position: "relative" }}>
                <img
                  src="/assets/message.png"
                  style={{ width: 220, height: 80 }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "30%",
                    top: 0,
                    fontSize: 24,
                    fontWeight: "bolder",
                  }}
                >
                  Rentals
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "22%",
                    top: "36%",
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#7f8c8d",
                  }}
                >
                  For hours & days
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", left: "48%", top: 0 }}>
              <div
                style={{
                  width: 220,
                  height: 85,
                  padding: 5,
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{ fontSize: 24, fontWeight: "bolder", color: "#fff" }}
                >
                  Subscriptions
                </div>
                <div
                  style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                >
                  For month & year
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/assets/Rentals2.png "
              style={{ width: 120, marginTop: "5%" }}
            />
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#7f8c8d",
              marginTop: "1%",
            }}
          >
            Self drive car rental in india
          </div>
          <div
            onClick={handleCityDialog}
            style={{
              cursor: "pointer",
              marginTop: "5%",
              padding: 10,
              alignItems: "center",
              display: "flex",
              width: 400,
              height: 50,
              borderRadius: 15,
              border: "1px solid #bdc3c7",
            }}
          >
            <LocationOn />
            <span style={{ paddingLeft: 20, fontSize: 18, fontWeight: 600 }}>
              {selectedCity}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: 420,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                marginTop: "5%",
                padding: 10,
                alignItems: "center",
                display: "flex",
                width: 180,
                height: 40,
                borderRadius: 15,
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
                marginTop: "5%",
                padding: 10,
                alignItems: "center",
                display: "flex",
                width: 180,
                height: 40,
                borderRadius: 15,
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

          <div>{daysTime}</div>
          <div
          onClick={handleClick}
            style={{
              cursor: "pointer",
              marginTop: "5%",
              background: "#f39c12",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: 380,
              height: 40,
              borderRadius: 20,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: "bolder", color: "#fff" }}>
              Search
            </span>
          </div>
        </Paper>
      </div>

      {cityDialog()}
    </div>
  );
}
