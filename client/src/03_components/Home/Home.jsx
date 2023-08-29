import React from "react";
import NavBar from '../NavBar/NavBar';
import './Home.css'
import Cards from '../Cards/Cards';

export default function Home() {
  return (
    <div className = 'homeContainer'>
      <div className = 'navBar'>
        <NavBar/>
     </div>
     <div className = 'cards'>
     </div>
     <Cards/>
    </div>
  );
}
