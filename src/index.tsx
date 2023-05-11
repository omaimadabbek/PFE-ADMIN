import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./component/Page/Home/Home";

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";




const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const isConnected:any = localStorage.getItem("User")
console.log("c",isConnected!==null && Object.keys(isConnected).length>0)
root.render(
  

<React.StrictMode>
   {/*  <BrowserRouter>*/}
  { !(isConnected!==null && Object.keys(isConnected).length>0) ? (
 
    <Router>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    
  </Routes>

 </Router>
 
) :
      <App />
     }
   {/*   </BrowserRouter>*/}
  {/*   <App />*/}
  </React.StrictMode> 
);
