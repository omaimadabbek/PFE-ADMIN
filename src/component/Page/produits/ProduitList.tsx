import { Button } from "reactstrap";
import "./ProduitListe.style.css";
import { IProduit } from "./Produit.type";

type Props = {
    list: IProduit[];
    setProduitSelected: React.Dispatch<any>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    modal:boolean
    setUpdateData: React.Dispatch<React.SetStateAction<boolean>>
    updateData:boolean
};
const ProduitList = (props: Props) => {
    const { list,
        setProduitSelected,
        setModal,
        modal,
        setUpdateData,
        updateData,
    } = props;
 

  
  function onUpdatePrd (produit:any){
    setProduitSelected(produit)
    setModal(!modal)
  }
  function deletePost(id_produit: any) {
      fetch(`http://localhost:5000/produits/${id_produit}`, { 
        method: 'DELETE' });
        setUpdateData(!updateData)
    }
            
return <div >
        <article className="list-header">
            <h3>Liste de Produit</h3>
        </article>

        <table >
            <thead>
                <tr>
                    <th>Categorie</th>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Image</th>
                    <th>Repture De Stock</th>
                    <th> Description</th>


                    <th>Action</th>
                </tr></thead>

            {list.map((produit:any,index:number) => {
                console.log("produit",produit);
                return (
                    <tr key={produit.id_produit}>
                        <td>{produit.id_categorie}</td>
                        <td>{produit.nom}</td>
                        <td>{produit.prix}$</td>
                        <td><img src={produit.image} alt="" style={{maxWidth:"80px"}}/></td>
                        <td>{produit.repture_de_stock}</td>
                        <td>{produit.description}</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                
                                <div  style={{marginRight:"10px"}}>
                                <Button
                                    color="primary"
                                  
                                    onClick={()=>{onUpdatePrd(produit)}}>
                                    Modifier
                                </Button>
                                
                                </div>
                                <div>
                                <Button
                                    color="primary"
                                    onClick={() => {deletePost(produit.id_produit)}}
                                    
                                >
                                   Supprimer
                                </Button>
                                </div>


                              
                            </div>
                        </td>
                    </tr>
                );
              })}

        </table>
             
        </div>
};

export default ProduitList;




