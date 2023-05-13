
import "./ProduitListe.style.css";
import { IProduit } from "./Produit.type";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  list: IProduit[];
  setProduitSelected: React.Dispatch<any>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};
const ProduitList = (props: Props) => {
  const {
    list,
    setProduitSelected,
    setModal,
    modal,
    setUpdateData,
    updateData,
  } = props;

  function onUpdatePrd(produit: any) {
    setProduitSelected(produit);
    setModal(!modal);
  }
  function deletePost(id_produit: any) {
    fetch(`${process.env.REACT_APP_API_URL}/produits/${id_produit}`, {
      method: "DELETE",
    });
    setUpdateData(!updateData);
  }

  return (
    <div>
      <article className="list-header">
        <h3>Liste de Produit</h3>
      </article>

      <table>
        <thead>
          <tr>
            <th>Categorie</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Repture De Stock</th>
            <th> Description</th>

            <th>Action</th>
          </tr>
        </thead>

        {list.map((produit: any, index: number) => {
          console.log("produit", produit);
          return (
            <tr key={produit.id_produit}>
              <td>{produit.id_categorie}</td>
              <td>{produit.nom}</td>
              <td>{produit.prix}$</td>
              <td>
                <img src={produit.image} alt="" style={{ maxWidth: "80px" }} />
              </td>
              <td>{produit.repture_de_stock}</td>
              <td>{produit.description}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Tooltip title="Modifier Produit" arrow>
                    <div
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "orange",
                      }}
                      onClick={() => {
                        onUpdatePrd(produit);
                      }}
                    >
                      <BsFillPencilFill />
                    </div>
                  </Tooltip>
                  <Tooltip title="Supprimer Produit" arrow>
                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "red",
                      }}
                      onClick={() => {
                        deletePost(produit.id_produit);
                      }}
                    >
                      <MdDeleteForever />
                    </div>
                  </Tooltip>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ProduitList;
