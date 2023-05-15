import React from "react";
import FormGroup from "@mui/material/FormGroup";
import { getData, postData } from "../../services/FetchNodeServices";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { json } from "react-router-dom";
import { propsToClassKey } from "@mui/styles";

export default function Filter(props) {
  const [segment, setSegment] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState({});
  const [selectedFuel, setSelectedFuel] = useState({});
  const [selectedSeat, setSelectedSeat] = useState({})
  const [filterList, setFilterList] = useState({});

  const fetchCompany = async () => {
    var response = await getData("user/display_all_company");
    setSegment(response.data);
  };

  useEffect(function () {
    fetchCompany();
  }, []);

  

  const handleSegmentChange = (event) => {
    var segment = selectedSegment;
    if (event.target.checked) segment[event.target.value] = event.target.value;
    else delete segment[event.target.value];
    setSelectedSegment(segment);
    var filter = filterList;
    filter = { ...filter, 'segment': segment };
    setFilterList(filter);
    props.filterOperations(filter);
  };

  const handleFuelType = (event) => {
    var Fuel = selectedFuel;
    if (event.target.checked) Fuel[event.target.value] = event.target.value;
    else delete Fuel[event.target.value];
    setSelectedFuel(Fuel);
    var filter = filterList;
    filter = { ...filter, 'fuels': Fuel };
    setFilterList(filter);
    props.filterOperations(filter);
   
  };
  const handleSeatChange = (event) => {
    var seat = selectedSeat;
    if (event.target.checked) seat[event.target.value] = event.target.value;
    else delete seat[event.target.value];
    setSelectedSeat(seat);
    var filter = filterList;
    filter = { ...filter, 'seat': seat };
    setFilterList(filter);
    props.filterOperations(filter);
  };

  const Company = () => {
    return segment.map((item) => {
      return (
        <div style={{ display: "flex", justifyContent: "left" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox value={item.companyid} />}
              onChange={handleSegmentChange}
              label={item.companyname}
            />
          </FormGroup>
        </div>
      );
    });
  };
  const Fuel = () => {
    return (
      <div style={{ display: "flex" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value="Petrol" onChange={handleFuelType} />}
            label={"Petrol"}
          />
          <FormControlLabel
            control={<Checkbox value="Diesel" onChange={handleFuelType} />}
            label={"Diesel"}
          />
          <FormControlLabel
            control={<Checkbox value="Electric" onChange={handleFuelType} />}
            label={"Electric"}
          />
          <FormControlLabel
            control={<Checkbox value="CNG" onChange={handleFuelType} />}
            label={"CNG"}
          />
        </FormGroup>
      </div>
    );
  };

  const Transmission = () => {
    return (
      <div style={{ display: "flex" }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Manual" />
          <FormControlLabel control={<Checkbox />} label="Automatic" />
        </FormGroup>
      </div>
    );
  };
  const Seating = () => {
    return (
      <div style={{ display: "flex" }}>
        <FormGroup>
          <FormControlLabel control={<Checkbox value="5" onChange={handleSeatChange} />} label="5 seats" />
          <FormControlLabel control={<Checkbox value="7" onChange={handleSeatChange} />} label="7 seats" />
        </FormGroup>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: 300,
        height: 700,
        background: "#f2f2f2",
        margin: 35,
      }}
    >
      <div style={{ margin: 20, marginLeft: 40 }}>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <span
            style={{
              fontSize: 25,
              fontWeight: 500,
              color: "black",
              fontFamily: "poppins",
            }}
          >
            FILTER'S
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "black",
              fontFamily: "poppins",
              color: "#1abc9c",
            }}
          >
            Reset All
          </span>
        </div>
        <Divider width={250} />
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 30 }}
        >
          <span style={{ fontFamily: "poppins" }}>Segment</span>
          {Company()}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          <span style={{ fontFamily: "poppins" }}>Fuel Type</span>
          {Fuel()}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          <span style={{ fontFamily: "poppins" }}>Transmission</span>
          {Transmission()}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          <span style={{ fontFamily: "poppins" }}>Seating Type</span>
          {Seating()}
        </div>
      </div>
    </div>
  );
}
