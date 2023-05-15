import { autocompleteClasses } from "@mui/material";
import React from "react";
import { getData } from "../../services/FetchNodeServices";
import { useState, useEffect } from "react";
import { flexbox } from "@mui/system";

export default function Serviceable(props) {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    var result = await getData("user/display_all_cities");
    setCities(result.data);
  };

  useEffect(function () {
    fetchCities();
  }, []);

  const playSlide = () => {
    return cities.map((item) => {
      return (
        <div key={item.cityid}>
          <div>
            <div
              style={{
                display:'flex',
               padding:40,
                fontSize: 18,
                fontWeight: 400,
                fontColor: "#dfe6e9",
                "&:hover": { color: "#ffffff" },
                textDecoration: "none",
              }}
            >
            Self Drive Car Rental in  {item.cityname}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: "bolder", color: "#fff" }}>
          Serviceable Cities
        </span>
      </div>
      <div
        style={{
          display: "flex",
          width: "96%",
          flexWrap:'wrap',
          height: 300,
          boxShadow: "0px 0px 10px -5px black",
          background: "#34495e",
          borderRadius: 20,
          paddingTop: 40,
          paddingLeft: 20,
          justifyContent: "space-between",
       
        }}
      >
        {playSlide()}
      </div>
    </div>
  );
}
