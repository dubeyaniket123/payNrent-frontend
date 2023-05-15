import React from "react";
import HeaderComponent from "./Mycomponent/HeaderComponent";
import Header from "./Mycomponent/Header";
import Filter from "./Mycomponent/Filter";
import { Grid } from "@mui/material";
import VehicleComponent from "./Mycomponent/VehicleComponent";
import { ServerURL, getData } from "../services/FetchNodeServices";
import { useState, useEffect } from "react";
import { Segment } from "@mui/icons-material";

export default function VehicleDetails(props) {
  const [vehicleList, setVehicleList] = useState([]);
  const [tempVehicleList, setTempVehicleList] = useState([]);
  const fetchVehicle = async () => {
    var result = await getData("vehicle/display_all_vehicle");
    setVehicleList(result.data);
    setTempVehicleList(result.data);
  };

  useEffect(function () {
    fetchVehicle();
  }, []);

  const segmentFilter = (ids) => {
    
    var models = Object.values(ids?.segment ? ids.segment : {});
    var fuels = Object.values(ids?.fuels ? ids.fuels : {});
    var seats = Object.values(ids?.seat ? ids.seat : {})
   
    var str_segment = "";
    var i;
    //model
    if (models.length > 0) {
      for (i = 0; i < models.length; i++) {
        str_segment = str_segment + "item.companyid===" + models[i] + " || ";
      }
      str_segment = str_segment.substring(0, str_segment.lastIndexOf("||") - 1);
    }
   
    //Fuel
    var str_fuel = "";
    if (fuels.length > 0) {
      for (i = 0; i < fuels.length; i++) {
        str_fuel = str_fuel + "item.fueltype==='" + fuels[i] + "' || ";
      }
      str_fuel = str_fuel.substring(0, str_fuel.lastIndexOf("||") - 1);
    }
    //Seats
    var str_seat = "";
    if (seats.length > 0) {
      for (i = 0; i < seats.length; i++) {
        str_seat = str_seat + "item.seats==='" + seats[i] + "' || ";
      }
      str_seat = str_seat.substring(0, str_seat.lastIndexOf("||") - 1);
    }
    
    //final
    var final_query = "";
    if (str_segment != "") {
      final_query = final_query + str_segment + " && ";
    }
    if (str_fuel != "") {
      final_query = final_query + str_fuel + " || ";
    }
    // if (str_seat != "") {
    //   final_query = final_query + str_seat + " || ";
    // }
    if (str_fuel === "")
      final_query = final_query.substring(0, final_query.lastIndexOf("&&") - 1);
    //  if(str_seat === "")
    //   final_query = final_query.substring(0, final_query.lastIndexOf("&&") - 1);
      else
      final_query = final_query.substring(0, final_query.lastIndexOf("||") - 1);

   

    var temp = tempVehicleList.filter((item) => {
      return eval(final_query);
    });
    setVehicleList(temp);
  };

  const filterOperations = (parameter) => {
    segmentFilter(parameter);
  };

  const listVehicle = () => {
    return vehicleList.map((item) => {
      return (
        <div style={{ padding: 5, margin: 5 }}>
          <VehicleComponent item={item} />
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#dfe6e9",
      }}
    >
      <div>
        <Header />
      </div>

      <div>
        <HeaderComponent />
      </div>

      <Grid container spacing={4}>
        <Grid xs={3}>
          <Filter filterOperations={filterOperations} />
        </Grid>
        <Grid xs={9}>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 40 }}>
            {listVehicle()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
