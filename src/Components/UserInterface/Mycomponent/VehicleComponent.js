import React, { useState } from "react";
import { Button } from "@mui/material";
import { ServerURL } from "../../services/FetchNodeServices";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSignUpDrawer from "./UserSignUpDrawer";
export default function VehicleComponent(props) {
  var item = props.item;
  var dispatch = useDispatch();
  var bookingDetails= useSelector((state)=>state.Booking )
  var [status, setStatus] = useState(false);

  const handleClick = (item) => {
    var rent=(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*(bookingDetails.hrs))
    item['rent']=rent
    dispatch({ type: "ADD_VEHICLE", payload: [item.vehicleid, item] });
    setStatus(true);
  };
  const handleStatus = () => {
    setStatus(false);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: 260,
          background: "#f2f2f2",
          padding: 10,
          borderRadius: 20,
          flexDirection: "column",
        }}
      >
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <img src={`${ServerURL}/images/${item.icon}`} width="50%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#59646f" }}>
            {item.companyname}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#122232",
              marginTop: 1,
            }}
          >
            {item.modelname}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              fontFamily: "poppins",
              fontSize: 12,
              fontWeight: 400,
              color: "#59646f",
            }}
          >
            <div style={{ marginRight: 7 }}>
              <span style={{ marginRight: 3 }}>
                <img src="/assets/petrol.svg " />
              </span>
              {item.fueltype}
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
              {item.capacity}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              height: 30,
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "poppins",
                  fontSize: 17,
                  fontWeight: "bolder",
                }}
              >
                &#8377;
              </span>
              <span
                style={{
                  fontFamily: "poppins",
                  fontSize: 22,
                  fontWeight: "bolder",
                  marginLeft: 4,
                }}
              >
                {(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*(bookingDetails.hrs))}
              </span>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => handleClick(item)}
                style={{
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                }}
              >
                Book &gt;
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 400, color: "#59646f" }}>
              Prices <span style={{ fontWeight: "bolder" }}> exclude </span>{" "}
              fuel cost
            </span>
          </div>
        </div>
        <UserSignUpDrawer status={status} handleStatus={handleStatus} />
      </div>
    </div>
  );
}
