import React from 'react';
import Services from '../Services/Services';
import JoinUs from '../JoinUs/JoinUs';
import Carousel from '../Carousel/Carousel';
import '../../App.css'
import Features from '../Features/Features';
import Footer from '../Footer/Footer';

export default function Home() {
  return (
    <div className='container-fluid'>
     
      <div className="row">
       <Carousel/>
       <Features/>
       <Footer/>
        
      </div>
    </div>
  );
}
