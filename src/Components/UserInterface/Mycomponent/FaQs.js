import { Divider } from "@mui/material";
import React from "react";

export default function FaQs(props) {
  const playSlide = () => {
    return (
      <div
        style={{
          justifyItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "95%",
          height: 440,
          borderRadius:20,
          background: "#fff",
          paddingLeft: 10,
          paddingRight: 10,
          boxShadow: "0px 0px 10px -5px black",
        }}
      >
        <div
          style={{
            border: 10,

            width: "95%",
            height: 100,
            paddingTop:10

          
          }}
        >
          <h
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#2d3436",
              paddingLeft: 10,
            
            }}
          >
            Is there a speed limit?
          </h>
          <p
            style={{
              fontSize: 18,
              color: "#636e72",
              fontWeight: 400,
              paddingLeft: 10,
              marginBottom: '30px',
              marginTop:'0.1cm'
            }}
          >
            Revv allows up to 125 km/hr. However it is 80 km/hr in a few cities
            where some cars might be equipped with speed governors as per
            government directives. Revv strictly advises to follow local speed
            limits.
          </p>
        </div>
        <Divider   />
        <div
          style={{
            border: 10,
            paddingTop:10,
            width: "95%",
            height: 100,
            left: 10,
          }}
        >
          <h
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#2d3436",
              paddingLeft: 10,
             
            }}
          >
            Can I extend/ cancel/ modify?

          </h>
          <p
            style={{
              fontSize: 18,
              color: "#636e72",
              fontWeight: 400,
              paddingLeft: 10,
              marginTop:'0.1cm'
            }}
          >
           Yes, extensions are possible subject to availability & charges. Cancellations & modifications will attract nominal charges as per our policy.
          </p>
        </div>
        <Divider   />
        <div
          style={{
            border: 10,
            paddingTop:10,
            width: "95%",
            height: 100,
            left: 10,
          }}
        >
          <h
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#2d3436",
              paddingLeft: 10,
             
            }}
          >
           Booking criteria & documents?
          </h>
          <p
            style={{
              fontSize: 18,
              color: "#636e72",
              fontWeight: 400,
              paddingLeft: 10,
              marginTop:'0.1cm'
            }}
          >
           Min. 21 years old, have valid original government ID (Aadhar, Passport, or PAN only) and a valid driving licence for “Light Motor Vehicles”, which is min. 1 year old at the time of starting the trip.
          </p>
        </div>
        <Divider   />
        <div
          style={{
            border: 10,
            paddingTop:10,
            width: "95%",
            height: 100,
            left: 10,
          }}
        >
          <h
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#2d3436",
              paddingLeft: 10,
             
            }}
          >
            Are there any restricted areas?
          </h>
          <p
            style={{
              fontSize: 18,
              color: "#636e72",
              fontWeight: 400,
              paddingLeft: 10,
              marginTop:'0.1cm'
            }}
          >
           Leh/Ladhakh, Spiti Valley & Kaza/Nako regions are not permitted to take Revv cars. Customer will be fully liable for any damages incurred to the car in that region.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
          paddingTop: 10,
          
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: 28, color: "#fff" }}>
          FAQ's
        </span>
      </div>
      {playSlide()}
    </div>
  );
}
