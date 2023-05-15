import { React, useState, useEffect, createRef } from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData,ServerURL } from '../../services/FetchNodeServices';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function OfferComponent(props){
    const [offers, setOffers] = useState([])
    var myslider=createRef()
   

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:false
      };
    
     const fetchOffers = async () => {
        var result = await getData('user/get_offers')
        setOffers(result.data)
    }
    useEffect(function () {
        fetchOffers()
},[])

const playSlide = () => {
  return offers.map((item) => {
      return (
          <div key={item.offerid}>
              <div style={{justifyItems:'center',position:'relative',display:'flex',width:285,height:100,borderRadius:20,background:'#fff', paddingLeft: 10, paddingRight: 10 }}>
              <span style={{position:'absolute',height:"60px",width:"60px",left:"20px",top:'26%',display:'inline-block',}}>
                <img  src={`${ServerURL}/images/${item.image}`} style={{ height:"100%",width:"100%",objectFit:'contain'}} />
              </span>
                <h style={{fontSize:18,fontWeight:700,color:'#2d3436',left:95,top:12,position:"absolute"}}>
                    {item.title}
                </h>
                <p style={{position:"absolute",fontSize:15,color:'#636e72',fontWeight:600,left:90,top:25}}>
                    {item.description}
                </p>
              </div>
          </div>
      )
  })
}
const handleClickLeft=()=>{
    myslider.current.slickPrev()
  }
  const handleClickRight=()=>{
    myslider.current.slickNext()
  }



return(
   <div style={{width:'100%'}}>
   <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10,width:'96%'}}>
    <span style={{fontWeight:"bolder",fontSize:28,color:'#fff'}}>Offers</span>
    <span><KeyboardArrowLeftIcon onClick={handleClickLeft} /> <KeyboardArrowRightIcon onClick={handleClickRight} /> </span>
   </div>
   <Slider ref={myslider} {...settings}>
                    {playSlide()}
                </Slider>
   </div>
)

}
