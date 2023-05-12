import { Button } from "reactstrap";
import { ICategorie } from "./Categorie.type";
import "./CategorieListe.style.css";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  list: ICategorie[];
  setCategorieSelected: React.Dispatch<any>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};
const CategorieList = (props: Props) => {
  const {
    list,
    setCategorieSelected,
    setModal,
    modal,
    setUpdateData,
    updateData,
  } = props;

  function onUpdateCat(categorie: any) {
    setCategorieSelected(categorie);
    setModal(!modal);
  }
  function deletePost(id_categorie: any) {
    fetch(`http://localhost:5000/categorie/${id_categorie}`, {
      method: "DELETE",
    });
    setUpdateData(!updateData);
  }

  return (
    <div>
      <article className="list-header">
        <h3>Liste de Categorie</h3>
      </article>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        {list.map((categorie: any, index: number) => {
          return (
            <tr key={categorie.id_categorie}>
              <td>{`${categorie.nom_categorie}`}</td>
              <td>
                <img
                  src={categorie.image}
                  alt=""
                  style={{ maxWidth: "80px" }}
                />
              </td>
              {/* <td>{categorie.image}</td> */}
              <td>
                <div className="d-flex justify-content-center">
                  <Tooltip title="Modifier Categorie" arrow>
                    <div
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "orange",
                      }}
                      onClick={() => {
                        onUpdateCat(categorie);
                      }}
                    >
                      <BsFillPencilFill />
                    </div>
                  </Tooltip>
                  <Tooltip title="Supprimer Categorie" arrow>
                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "red",
                      }}
                      onClick={() => {
                        deletePost(categorie.id_categorie);
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

export default CategorieList;
