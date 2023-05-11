import {
    ProSidebarProvider,
    Sidebar,
    Menu,
    MenuItem,
    SubMenu
  } from "react-pro-sidebar";
  import { useNavigate } from "react-router-dom";

  
  export default function SideBar() {
    const navigate = useNavigate();
    return (
      <div style={{ display: "flex", height: "100%" }}>
       
        <ProSidebarProvider>
          <Sidebar>
          
            <Menu>
            <MenuItem onClick={() => navigate("/Admin")}>Gestion Admin </MenuItem>

              <SubMenu label="Gestion Carte">
              <MenuItem onClick={() => navigate("/Categorie")}> categorie</MenuItem>
                <MenuItem onClick={() => navigate("/Produit")}>produit</MenuItem>
                
              </SubMenu>

              <SubMenu label="Gestion Commande">
                <MenuItem onClick={() => navigate("/Commande")}> Mes Commandes</MenuItem>
                <MenuItem> Commande accepté</MenuItem>
                <MenuItem> Commande refusé</MenuItem>
                <MenuItem> Commande en attente</MenuItem>
              </SubMenu>
              
            </Menu>
          </Sidebar>
        </ProSidebarProvider>
      </div>
    );
  }
  
