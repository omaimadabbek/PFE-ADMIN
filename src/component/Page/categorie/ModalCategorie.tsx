import { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Image from "../Image";

type ModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  nom: string;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setNom: React.Dispatch<React.SetStateAction<string>>;
  idSelected: number;
     setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
    updateData: boolean;
};

const ModalCategorie = ({
  modal,
  setModal,
  nom,
  image,
  type,
  setNom,
   setUpdateData,
    updateData,
  // setImage,
  idSelected,
}: ModalType) => {
  const [imageCategorie, setImage] = useState("");
  async function AddCatt(dataImage:any) {
    fetch("http://localhost:5000/categorie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_categorie: nom,
        image: dataImage,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setModal(!modal);
    setUpdateData(!updateData);
  }
  async function updateCategorie(urlImage:any) {
    fetch(`http://localhost:5000/categorie/${idSelected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_categorie: nom,
        image: urlImage,
        
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("There was an error!", error);
      });
      setUpdateData(!updateData);
    setModal(!modal);
    
   
  }
  async function registreCategorie() {
    if (imageCategorie) {
      var formData = new FormData();
      let img = imageCategorie
      for (const i of Object.keys(img)) {
        formData.append('imgCollection', img[i as unknown as number]);
      }
      await fetch(`http://localhost:5000/uploadImage`, {
        body: formData,
        method: 'POST'
      })
        .then((response) => response.json())
        .then((data: any) => {
          AddCatt(data);
        });
    } else {
      AddCatt(imageCategorie);
    }
  }
  async function updateCategorieImage() {
    if (imageCategorie!==image) {
      var formData = new FormData();
      let img = imageCategorie;
      for (const i of Object.keys(img)) {
        formData.append("imgCollection", img[i as unknown as number]);
      }
      await fetch(`http://localhost:5000/uploadImage`, {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then((data: any) => {
          updateCategorie(data)
        });
    } else {
      updateCategorie(image)
    }
  }


  return (
    <Modal isOpen={modal}>
      <ModalHeader className="d-flex justify-content-center" 
      style={{fontFamily:"fantasy",fontStyle:"oblique"}}>
        {type === "add" ? "Ajouter Categorie" : "Modifier Categorie"}
        </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleNom" style={{ fontWeight:"bolder" }} sm={2}>
            Nom
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Nom"
              name="Nom"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setNom(e.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <br />

        <FormGroup >
          <Label for="exampleImage" style={{fontWeight:"bolder" }} sm={2}>
            Image
          </Label>
          <Col sm={10}>
              <Image setImage={setImage} />
          </Col>
        </FormGroup>

        <br />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          margin="auto"
          onClick={() => (type === "add" ? registreCategorie() : updateCategorieImage())}
          // onClick={() => (type === "add" ? AddCatt() : updateCategorie())}
        >
          {type === "add" ? "Ajouter Categorie" : "Modifier Categorie "}
        </Button>{" "}
        <Button color="secondary" onClick={() => setModal(!modal)}>
          Back
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalCategorie;


