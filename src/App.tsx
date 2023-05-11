
import "./App.css";
import Router1 from "./Router";
import { BrowserRouter  } from "react-router-dom";
import Home from "./component/Page/Home/Home";
import AppLayout from "./component/sidebar/AppLayout";
import Commande from "./component/Page/Commandes/Commande";
import Admin from "./component/Page/Admin/Admin";
import Categorie from "./component/Page/categorie/Categorie";
import Produit from "./component/Page/produits/Produit";
export default function App() {
  let isConnected:any = localStorage.getItem("isConnected")



  return(

    <BrowserRouter><Router1 /></BrowserRouter>
    
//!isConnected ? (
// 
//    <Router>
 
//  <Routes>
//    <Route path="/" element={<Home />} />
//    <Route path="/Home" element={<Home />} />
//    
//  </Routes>
//
// </Router>
// 
//) : (
//  //<Router1 />
//  
//<Router>
//      <AppLayout />
//     
//        <Routes>
//        <Route path="/Categorie" element={<Categorie />} />
//      <Route path="/Produit" element={<Produit />} />
//      
//          <Route path="/Commande" element={<Commande />} />
//          <Route path="/Admin" element={<Admin />} />
//        </Routes>
//    
//    </Router>
//   
//)
  )
  }
  









