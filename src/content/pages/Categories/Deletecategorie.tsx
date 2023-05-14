import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type deleteproduit = {
  selectedcategorie: any;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function Deletecategorie({
  show,
  selectedcategorie,
  setShow,
  setIsUpdate
}: deleteproduit) {
  const handleClose = () => setShow(false);

  async function deletecategorie() {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/categorie/${selectedcategorie.id_categorie}`,
        {
          method: 'delete'
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: ' Categorie a été supprimé !',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(function () {
            setIsUpdate(true);
            handleClose();
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un categorie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous supprimer ce categorie : "{selectedcategorie?.nom_categorie}
        "
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" type="button" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" type="button" onClick={deletecategorie}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Deletecategorie;
