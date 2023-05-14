import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Input, Label } from 'reactstrap';
import Image from '../../overview/Login/Image';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type Modifier = {
  selectedcategorie: any;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

//eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Modifiercategorie({
  selectedcategorie,
  show,
  setShow,
  setIsUpdate
}: Modifier) {
  const [categorie, setcategorie] = useState(selectedcategorie);

  const [image, setImage] = useState();
  const handleClose = () => setShow(false);

  async function EditCategorie() {
    if (image !== categorie.image) {
      var formData = new FormData();
      let img: any = image;
      for (const i of Object.keys(img)) {
        formData.append('imgCollection', img[i as unknown as number]);
      }
      await fetch(`${process.env.REACT_APP_API_URL}/uploadImage`, {
        body: formData,
        method: 'POST'
      })
        .then((response) => response.json())
        .then((data: any) => {
          updatecategorie(data);
        });
    } else {
      updatecategorie(categorie.image);
    }
  }

  async function updatecategorie(urlImage: any) {
    try {
      fetch(
        `${process.env.REACT_APP_API_URL}/categorie/${categorie.id_categorie}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom_categorie: categorie.nom_categorie,
            image: urlImage
          })
        }
      ).then((response) => response.json());
      setIsUpdate(true);
      Swal.fire({
        title: 'Le produit a été modifié !',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    setcategorie(selectedcategorie);
    setImage(selectedcategorie?.image);
  }, [selectedcategorie]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <div className="justify-content-center">
          <Modal.Title>Modifier Categorie</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="bd-highlight">
            <FormGroup>
              <Label
                className="box1"
                for="exampleNom"
                style={{ color: '#070f1b' }}
              >
                Nom
              </Label>
              <Input
                className="box"
                id="exampleNom"
                name="Nom"
                placeholder="Nom"
                value={categorie?.nom_categorie}
                onChange={(event: any) => {
                  setcategorie({
                    ...categorie,
                    nom_categorie: event.target.value
                  });
                }}
              />
            </FormGroup>
          </div>

          <div className=" bd-highlight mt-3">
            <Image setImage={setImage} images={selectedcategorie?.image} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            handleClose();
          }}
        >
          Annuler
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            EditCategorie();
          }}
        >
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
