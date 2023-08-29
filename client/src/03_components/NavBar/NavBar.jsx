import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './NavBar.css'

export default function NavBar() {
 
  return (
    <div className='navBarConteiner'>
      <div className='conteinerMerch'> 
        <div  className='countries'>World</div>
      </div>
      <div className='navContent'>
      <Link className='navLink' to='/home'>Home</Link>
      <Link className='navLink' to='/activity'>Form</Link>
      <Link className='navLink' to='/activities'>Actividades Creadas</Link>
      <Link className='navLink' to='/about'>About</Link>
      <SearchBar className='navSearchBar'/>

    </div>
      </div>
  );
}