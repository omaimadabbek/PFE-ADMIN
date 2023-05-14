import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type deleteAdmin = {
  selectedAdmin: any;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteAdmin({
  show,
  selectedAdmin,
  setShow,
  setIsUpdate
}: deleteAdmin) {
  const handleClose = () => {
    setShow(false);
  };

  async function deleteAdmin() {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/Admin/${selectedAdmin.admin_id}`,
        {
          method: 'DELETE'
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: ' Admin a été supprimé !',
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
        <Modal.Title>Supprimer un Utilisateur </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous supprimer ce  utilisateur : "{selectedAdmin?.email}"
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" type="button" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" type="button" onClick={deleteAdmin}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAdmin;
