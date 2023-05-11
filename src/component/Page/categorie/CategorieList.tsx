import { Button } from "reactstrap";
import { ICategorie } from "./Categorie.type";
import "./CategorieListe.style.css";

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
      method: "DELETE" });
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
              <td><img src={categorie.image} alt="" style={{maxWidth:"80px"}}/></td>
              {/* <td>{categorie.image}</td> */}
              <td>
                <div className="d-flex justify-content-center">
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      color="primary"
                      onClick={() => {
                        onUpdateCat(categorie);
                      }}
                    >
                      Modifier
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      onClick={() => {
                        deletePost(categorie.id_categorie);
                      }}
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
  );
};

export default CategorieList;
