import { useState, useEffect } from "react";
import { ICategorie } from "./Categorie.type";
import CategorieList from "./CategorieList";
import ModalCategorie from "./ModalCategorie";
import { SiAddthis } from "react-icons/si";
import Tooltip from "@mui/material/Tooltip";
import "./Home.style.css";

const Categorie = () => {
  const [categorieList, setCategorieList] = useState([] as ICategorie[]);
  const [categorieSelected, setCategorieSelected] = useState<any>();
  const [type, setType] = useState("");
  const [nom, setNom] = useState("");
  const [image, setImage] = useState("");
  const [idSelected, setIdSelected] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);



  function getCategorie() {
    fetch(`${process.env.REACT_APP_API_URL}/categorie`)
      .then(async (response) => {
        const data = await response.json();
        setCategorieList(data);
        let result: any = [];
        data.forEach((element: any, index: any) => {
          result.push({
            value: element.id_categorie,
            label: element.nom_categorie,
          });
        });
        setlisteClients(result);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    getCategorie();
  }, [updateData]);

  useEffect(() => {
    setNom(categorieSelected?.nom_categorie);
    setImage(categorieSelected?.image);
    setIdSelected(categorieSelected?.id_categorie);
  }, [categorieSelected]);


  const handleAddCategorie = () => {
    setType("add");
    setModal(!modal);
  };

  return (
    <>
      <article className="article-header">
        <header>
          <h1>Restaurant Dabbek</h1>
        </header>
      </article>

      <section className="section-content">
        <>
          <Tooltip title="Ajouter Categorie" arrow>
            <div
              style={{
                marginRight: "10px",
                cursor: "pointer",
                fontSize: "x-large",
                color: "blue",
              }}
              onClick={() => {
                handleAddCategorie();
              }}
              className="add-categorie-btn"
            >
              <SiAddthis />
            </div>
          </Tooltip>
          <CategorieList
            list={categorieList}
            setCategorieSelected={setCategorieSelected}
            modal={modal}
            setModal={setModal}
            setUpdateData={setUpdateData}
            updateData={updateData}
          />
        </>
      </section>
      <ModalCategorie
        modal={modal}
        setModal={setModal}
        nom={nom}
        image={image}
        type={type}
        setNom={setNom}
        setImage={setImage}
        idSelected={idSelected}
        setUpdateData={setUpdateData}
        updateData={updateData}
      />
    </>
  );
};

export default Categorie;
function setlisteClients(result: any) {
  throw new Error("Function not implemented.");
}
