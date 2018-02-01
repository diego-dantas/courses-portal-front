//import of react
import React, { Component } from 'react';

//import of component
import HeaderBar from './box/generic/HeaderBar';

//import of css
import  './static/style/css/global.css';




class App extends Component {
   render(){
       return(
           <div>
                <HeaderBar />
                <img src='./static/img/odontologia-topo.jpg'/>
            </div>
       );
   } 
}



  
export default App;

