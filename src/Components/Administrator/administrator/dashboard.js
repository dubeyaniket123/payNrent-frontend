import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar,Grid} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './sideBar';
import Category from '../Category/Category';
import SubCategory from '../subcategory/SubCategory';
import Company from '../company/Company';
import Model from '../model/Model';
import Vehicle from '../vehicle/Vehicle';
import DisplayAllCategory from '../Category/DisplayAllCategory';
import DisplayAllCompany from '../company/DisplayAllCompany';
import DisplayAllModel from '../model/DisplayAllModel';
import DisplayAllSubCategory from '../subcategory/DisplayAllSubCategory';
import DisplayAllVehicle from '../vehicle/DisplayAllvehicle';
import FeatureInterface from '../Featured/FeatureInterface';
import Offers from '../Offers/Offers';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Whypnp from '../whypnp/whypnp';
 


export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PaynRent
          </Typography>

          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} >
        <div style={{paddingTop:5,paddingLeft:5,display:'flex',width:200,justifyContent:'center',alignItems:'center'}}>
          <img src='/assets/defaultcar.png' style={{width:100}}/>
        </div>
        </Grid>
        <Grid item xs={2}>
         <SideBar/>
        </Grid>
        <Grid item xs={10}>
        <Routes>
        <Route element={<Category/>} path="/category" />
        <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
        <Route element={<SubCategory/>} path="/subcategory" />
        <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
        <Route element={<Company/>} path="/company" />
        <Route element={<DisplayAllCompany/>} path="/displayallcompany" />
        <Route element={<Model/>} path="/model" />
        <Route element={<DisplayAllModel/>} path="/displayallmodel" />
        <Route element={<Vehicle/>} path="/vehicle" />
        <Route element={<DisplayAllVehicle/>} path="/displayallvehicle" />
        <Route element={<FeatureInterface/>} path="/featureinterface" />
        <Route element={<Offers/>} path="/offers" />
        <Route element={<Whypnp/>} path="/whypnp" />
        </Routes>
        </Grid>

      </Grid>
    </Box>
  );
}