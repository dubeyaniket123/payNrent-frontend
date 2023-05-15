import { Divider, ListItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { ServerURL } from "../services/FetchNodeServices";

export default function BookingSummary(props) {
  var vehicle = useSelector((state) => state.vehicle)
  var vehicleDetails = Object.values(vehicle)[0];

  var bookingDetails = useSelector((state) => state.Booking);
  console.log("READ Booking DATA 0",bookingDetails)
  
  var st=Object.values(bookingDetails.starttime)[2]
  var std=st.toDateString()
  var stt=st.getHours()+":"+st.getMinutes()+":"+st.getSeconds()

  var et=Object.values(bookingDetails.endtime)[2]
  var etd=et.toDateString()
  var ett=et.getHours()+":"+et.getMinutes()+":"+et.getSeconds()
  var sdeposite=2000
  var delivery=400
  var total=delivery+sdeposite+vehicleDetails.rent

  var navigate = useNavigate();

  const handlechangecity = () => {
    navigate("/Vehicledetails");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        background: "#f2f2f2",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "65%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 260,
            boxShadow: "0px 0px 10px -5px black",
            margin: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 20,
              width: "30%",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "19px",
                  fontFamily: "poppins",
                  marginLeft: 35,
                }}
              >
                {vehicleDetails.companyname}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "19px",
                  fontFamily: "poppins",
                  marginLeft: 5,
                }}
              >
                {vehicleDetails.modelname}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <img src={`${ServerURL}/images/${vehicleDetails.icon}`} width="80%" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontFamily: "poppins",
                fontSize: 15,
                fontWeight: 500,
                marginLeft: 25,
                marginRight: 25,
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginRight: 7 }}>
                <span style={{ marginRight: 3 }}>
                  <img src="/assets/petrol.svg " />
                </span>
                {vehicleDetails.fueltype}
              </div>
              <div style={{ marginLeft: 10 }}>
                <span style={{ marginRight: 3 }}>
                  <img src="/assets/automatic.svg " />
                </span>
                Manual
              </div>
              <div style={{ marginLeft: 15 }}>
                <span style={{ marginRight: 3 }}>
                  <img src="/assets/seat.svg " />
                </span>
                {vehicleDetails.capacity} Seat
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              height: "100%",
            }}
          >
            <div
              style={{
                marginTop: 40,
                fontSize: 20,
                fontWeight: 460,
                width: "100%",
                height: "20%",
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  borderBottom: " 2px solid #8caead",
                  lineHeight: ".1em",
                  width: "40%",
                  textAlign: "center",
                }}
              ></h3>
              BOOKING DETAILS
              <h3
                style={{
                  borderBottom: " 2px solid #8caead",
                  lineHeight: ".1em",
                  width: "35%",
                  textAlign: "center",
                }}
              ></h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "20%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "35%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span>{std+" "+stt}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "30%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Divider
                  sx={{
                    "&::before, &::after": { borderColor: "secondary.dark" },
                  }}
                >
                  To
                </Divider>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "35%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span>{etd+" "+ett}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <span style={{ fontFamily: "poppins" }}>
                
                {bookingDetails.duration}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <span
                style={{ margin: 9, marignRight: 10, fontFamily: "poppins" }}
              >
                {bookingDetails.city}
              </span>
              <Button onClick={handlechangecity}>Change City</Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItem: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div
                style={{ fontFamily: "poppins", marginLeft: 10, marginTop: 8 }}
              >
                Pricing Plan: Includes 357 kms, excludes fuel
              </div>
              <div>
                {" "}
                <Button>Change plan</Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: 420,
            boxShadow: "0px 0px 10px -5px black",
            margin: 5,
          }}
        >
          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              fontWeight: 460,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                borderBottom: " 2px solid #8caead",
                lineHeight: ".1em",
                width: "32%",
                textAlign: "center",
              }}
            ></h3>
            IMPORTANT POINTS TO REMEMBER
            <h3
              style={{
                borderBottom: " 2px solid #8caead",
                lineHeight: ".1em",
                width: "35%",
                textAlign: "center",
              }}
            ></h3>
          </div>
          <div style={{ margin: 15 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                height: 50,
              }}
            >
              <div style={{ width: "30%", fontSize: 14 }}>
                CHANGE IN PRICING PLAN:
              </div>
              <div
                style={{ width: "70%", fontFamily: "poppins", fontSize: 15 }}
              >
                {" "}
                The pricing plan (6 kms/hr, without fuel) cannot be changed
                after the booking is made
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                height: 60,
              }}
            >
              <div style={{ width: "30%", fontSize: 14 }}>FUEL:</div>
              <div
                style={{ width: "70%", fontFamily: "poppins", fontSize: 15 }}
              >
                In case you are returning the car at a lower fuel level than
                what was received, we will charge a flat Rs 500 refuelling
                service charge + actual fuel cost to get the tank to the same
                level as what was received
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: 50,
                alignItems: "center",
              }}
            >
              <div style={{ width: "30%", fontSize: 14 }}>
                TOLLS, PARKING, INTER-STATE TAXES:
              </div>
              <div
                style={{ width: "70%", fontFamily: "poppins", fontSize: 15 }}
              >
                To be paid by you.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                height: 120,
              }}
            >
              <div style={{ width: "30%", fontSize: 14 }}>ID VERIFICATION:</div>
              <div
                style={{ width: "70%", fontFamily: "poppins", fontSize: 15 }}
              >
                Please keep your original Driving License handy. While
                delivering the car to you, our executive will verify your
                original Driving License and ID proof (same as the ones whose
                details were provided while making the booking). This
                verification is mandatory. In the unfortunate case where you
                cannot show these documents, we will not be able to handover the
                car to you, and it will be treated as a late cancellation (100%
                of the fare would be payable). Driving license printed on A4
                sheet of paper (original or otherwise) will not be considered as
                a valid document.
              </div>
            </div>
            <div 
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                height: 50,
              }}
            >
              <div style={{ width: "30%", fontSize: 14 }}>
                PRE-HANDOVER INSPECTION:
              </div>
              <div
                style={{ width: "70%", fontFamily: "poppins", fontSize: 15 }}
              >
                Please inspect the car (including the fuel gauge and odometer)
                thoroughly before approving the checklist.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "31%",
          height: 800,
          boxShadow: "0px 0px 10px -5px black",
          margin: 5,
          marginRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marging: 5,
            marginLeft: 10,
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              marginTop: 30,
              alignItems: "center",
              marginTop: 30,
              fontSize: 20,
              fontWeight: 460,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h3
              style={{
                borderBottom: " 2px solid #8caead",
                lineHeight: ".1em",
                width: "34%",
                textAlign: "center",
              }}
            ></h3>
            FARE DETAILS{" "}
            <h3
              style={{
                borderBottom: " 2px solid #8caead",
                lineHeight: ".1em",
                width: "39%",
                textAlign: "center",
              }}
            ></h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Base fare
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span>&#8377; {vehicleDetails.rent}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Doorstep delivery & pickup
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span>&#8377; {delivery}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Insurance & GST
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                {" "}
                Included
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Refundable security deposit
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span>&#8377; {sdeposite}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 10,
              width: "100%",
              marginTop: 50,
            }}
          >
            <Box style={{ width: "58%" }} sx={{ "& > :not(style)": { m: 0 } }}>
              <TextField
                style={{ width: "100%" }}
                id="input-with-icon-textfield"
                label="Promo Code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
            <div style={{ margin: 10 }}>
              <Button
                style={{
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                  color: "#fff",
                  fontFamily: "inherit",
                }}
                variant="contained"
              >
                Apply
              </Button>
            </div>
          </div>
          <h3
            style={{
              borderBottom: " 2px solid #7f8c8d",
              lineHeight: ".1em",
              width: "100%",
              textAlign: "center",
              marginTop: 40,
            }}
          ></h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 20,
              fontWeight: 460,
              marginLeft: 10,
              marginBottom: -8,
              marginTop: -8,
            }}
          >
            <span>Total</span>
            <span style={{ marginRight: 115 }}>&#8377; {total}</span>
          </div>
          <h3
            style={{
              borderBottom: " 1px solid #7f8c8d",
              lineHeight: ".1em",
              width: "100%",
              textAlign: "center",
            }}
          ></h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Kms limit
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                168 kms
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>Fuel</span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Excluded
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Extra kms charge
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                &#8377; 7/km
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "60%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                Tolls, Parking & Inter-state taxes
              </span>
            </div>
            <div style={{ width: "35%", alignItem: "center" }}>
              <span style={{ fontFamily: "poppins", fontSize: 15 }}>
                To be paid by you
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 8,
              marginTop:30,
              width: "100%",
              height: 25,
            }}
          >
            <div style={{ width: "58%", alignItem: "center" }}>
            <TextField
                            id="standard-basic"
                            label="Delivery Location"
                            variant="standard"
                            fullWidth
                          />
            </div>
            <div style={{ width: "35%", alignItem: "center",margin:10 }}>
             <Button onClick={()=>navigate("/paymentgateway")} variant="contained" color="secondary">Proceed</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
