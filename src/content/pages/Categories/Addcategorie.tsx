import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import { Input, Label, FormGroup, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import Image from '../../overview/Login/Image';

type deleteproduit = {
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function Addcategorie({ show, setShow, setIsUpdate }: deleteproduit) {
  const [nom, setNom] = useState('');
  const [imageproduit, setImage] = useState('');
  const handleClose = () => {
    setNom('');
    setImage('');
    setShow(false);
  };

  function addcategorie(image: any) {
    if (nom && image) {
      fetch(`${process.env.REACT_APP_API_URL}/categorie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom_categorie: nom,
          image: image
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdate(true);
          Swal.fire({
            title: 'Un nouveau Categorie a été ajouté',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(function () {
            handleClose();
          });
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } else {
      Swal.fire({
        title: 'Il est obligatoire de remplir tous les champs !',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  async function AjouterCategorie() {
    try {
      if (imageproduit) {
        var formData = new FormData();
        let img = imageproduit;
        for (const i of Object.keys(img)) {
          formData.append('imgCollection', img[i as unknown as number]);
        }
        await fetch(`${process.env.REACT_APP_API_URL}/uploadImage`, {
          body: formData,
          method: 'POST'
        })
          .then((response) => response.json())
          .then((data: any) => {
            addcategorie(data);
          });
      } else {
        addcategorie(imageproduit);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un categorie</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <div className="d-flex flex-column bd-highlight ">
          <div className=" bd-highlight ">
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 6, mb: 1 }}
              id="outlined-nom-input"
              label="Nom"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setNom(e.target.value);
              }}
            />
          </div>

          <div className=" bd-highlight mt-3">
            <Image setImage={setImage} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button type="button" variant="contained" onClick={AjouterCategorie}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addcategorie;
