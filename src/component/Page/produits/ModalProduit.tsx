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
// import Select from "react-select";
import { useState } from "react";
import Image from "../Image";

type ModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_categorie: string;
  nom: string;
  prix: string;
  image: string;
  repture_de_stock: string;
  description: string;
  type: string;
  setCategorie: React.Dispatch<React.SetStateAction<string>>;
  setNomProduit: React.Dispatch<React.SetStateAction<string>>;
  setPrix: React.Dispatch<React.SetStateAction<string>>;
 
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setReptureDeStock: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  idSelected: number;
  listeCategorie: any;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};

const ModalProduit = ({
  modal,
  setModal,
  id_categorie,
  nom,
  prix,
  image,
  repture_de_stock,
  description,
  type,
  setNomProduit,
  setCategorie,
  setPrix,
  setReptureDeStock,
  setDescription,
  idSelected,
  listeCategorie,
  setUpdateData,
  updateData,
}: ModalType) => {
  // const [idCategorieSelected, setIdCategorieSelected] = useState(0);
  const [imageProduit, setImage] = useState("");
  async function AddPrd(dataImage: any) {
    console.log("add")
    fetch(`${process.env.REACT_APP_API_URL}/produits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        id_categorie: id_categorie,
        nom: nom,
        prix: prix,
        image: dataImage,
        repture_de_stock: repture_de_stock,
        description: description,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("There was an error!", error);
      });
      setUpdateData(!updateData);
    setModal(!modal);
  }
  async function updateProduit(urlImage:any) {
    console.log("update")
 
    fetch(`${process.env.REACT_APP_API_URL}/produits/${idSelected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Categorie: id_categorie,
        nom: nom,
        prix: prix,
        image: urlImage,
        repture_de_stock: repture_de_stock,
        description: description,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("There was an error!", error);
      });
      setUpdateData(!updateData);
    setModal(!modal);
   
  }
  

  async function registreProduit() {
    if (imageProduit) {
      var formData = new FormData();
      let img = imageProduit;
      for (const i of Object.keys(img)) {
        formData.append("imgCollection", img[i as unknown as number]);
      }
      await fetch(`${process.env.REACT_APP_API_URL}/uploadImage`, {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then((data: any) => {
          AddPrd(data);
        });
    } else {
      AddPrd(imageProduit);
    }
  }
  async function updateProduitImage() {
    if (imageProduit!==image) {
      var formData = new FormData();
      let img = imageProduit;
      for (const i of Object.keys(img)) {
        formData.append("imgCollection", img[i as unknown as number]);
      }
      await fetch(`${process.env.REACT_APP_API_URL}/uploadImage`, {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then((data: any) => {
          updateProduit(data);
        });
    } else {
      updateProduit(image)
    }
  }

  return (
    <Modal isOpen={modal}>
      <ModalHeader
        className="d-flex justify-content-center"
        style={{ fontFamily: "fantasy", fontStyle: "oblique" }}
      >
        {type === "add" ? "Ajouter Produit" : "Modifier Produit"}
      </ModalHeader>
      <ModalBody>
        <FormGroup >
          <Label for="exampleCategorie" sm={2} style={{ fontWeight: "bolder" }}>
            Categorie
          </Label>
          <Col sm={10}>
            <Input
              style={{ width: "390px", marginLeft: "13px" }}
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(el: any) => {
                setCategorie(el.target.value);
              }}
            >
              {listeCategorie?.map((element: any) => {
                return <option value={element.value}>{element.label}</option>;
              })}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup >
          <Label for="exampleNom" sm={2} style={{ fontWeight: "bolder" }}>
            Nom
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Nom"
              name="Nom"
              type="text"
              value={nom}
              style={{ marginLeft: "15px" }}
              onChange={(e: any) => {
                setNomProduit(e.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <br />
        <FormGroup >
          <Label for="examplePrix" sm={2} style={{ fontWeight: "bolder" }}>
            Prix
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Prix"
              name="Prix"
              type="text"
              value={prix}
              style={{ marginLeft: "15px" }}
              onChange={(e: any) => {
                setPrix(e.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup >
          <Label for="exampleImage" sm={2} style={{ fontWeight: "bolder" }}>
            Image
          </Label>
          <Col sm={10}>
          
           
            <Image setImage={setImage} />
          </Col>
        </FormGroup>
        <FormGroup
          switch
          className="d-flex justify-content-start"
          style={{ paddingTop: "5px", marginRight: "25px" }}
        >
          <Label check style={{ fontWeight: "bolder" }} sm={4}>
            Repture De Stock
          </Label>
          <Col sm={10}>
            <Input
              type="switch"
              role="switch"
              onChange={(e: any) => {
                setReptureDeStock(e.target.value);
              }}
              style={{ fontSize: "25px", marginLeft: "10px" }}
            />
          </Col>
        </FormGroup>
        <br />

        <FormGroup >
          <Label
            for="exampleDescription"
            style={{ marginRight: "8px", fontWeight: "bolder" }}
            sm={2}
          >
            Description
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Description"
              name="Description"
              type="text"
              value={description}
              style={{ marginLeft: "8px" }}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </Col>
        </FormGroup>

        <br />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          margin="auto"
          onClick={() => (type === "add" ? registreProduit() : updateProduitImage())}
        >
          {type === "add" ? "Ajouter Produit" : "Modifier Produit"}
        </Button>{" "}
        <Button color="secondary" onClick={() => setModal(!modal)}>
          Back
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalProduit;
