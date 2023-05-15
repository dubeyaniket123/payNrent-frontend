import Header from "../UserInterface/Mycomponent/Header";
import SeachComponent from "./Mycomponent/SearchComponent";
import FeaturedComponent from "./Mycomponent/FeaturedComponent";
import { getData } from "../services/FetchNodeServices";
import { useState,useEffect } from "react";
import OfferComponent from "./Mycomponent/OfferComponent";
import WhypnpComponent from "./Mycomponent/whypnpComponent";
import PlayStore from "./Mycomponent/playStore";
import FaQs from "./Mycomponent/FaQs";
import Myjourney from "./Mycomponent/Myjourney";
import Ourinvestor from "./Mycomponent/Ourinvestor";
import Serviceable from "./Mycomponent/Serviceable";
export default function Home(props) {
  const [features,setFeaatures]=useState([])
  const getAllFeature=async()=>{
    var result=await getData('user/all_feature')
    setFeaatures(result.data)
  }
  useEffect(function(){
    getAllFeature()
  },[])


  return (
    <div style={{ display: "flex", flexDirection: "column",background:'#dfe6e9' }}>
      <Header />
      <div >
        <SeachComponent />
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <FeaturedComponent images={features} />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <OfferComponent  />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <WhypnpComponent />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <FaQs />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <PlayStore />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <Myjourney />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <Ourinvestor />
       </div>
       </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <div style={{width:'94%'}}> 
        <Serviceable />
       </div>
       </div>
      
    
    </div>
  );
}
