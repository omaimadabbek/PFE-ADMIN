import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import Image from '../../overview/Login/Image';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

type RegisterAdmin = {
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAdmin: any;
  setShow: Function;
  show: boolean;
};

export default function ModifierAdmin({
  selectedAdmin,
  setIsUpdate,
  show,
  setShow
}: RegisterAdmin) {
  const handleClose = () => setShow(false);
  const [Admin, setAdmin] = useState(selectedAdmin);

  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async function EditAdmin() {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/Admin/${Admin.admin_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: Admin.nom,
          prenom: Admin.prenom,
          email: Admin.email
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdate(true);
          Swal.fire({
            title: 'Admin  a été modifié !',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          handleClose();
        });
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    setAdmin(selectedAdmin);
  }, [selectedAdmin]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <div className="justify-content-center">
            <Modal.Title>Modifier Admin</Modal.Title>
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
                  value={Admin?.nom}
                  onChange={(event: any) => {
                    setAdmin({
                      ...Admin,
                      nom: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>
            <div className=" bd-highlight">
              <FormGroup>
                <Label
                  className="box1"
                  for="examplePrenom"
                  style={{ color: '#070f1b' }}
                >
                  Prenom
                </Label>
                <Input
                  className="box"
                  id="examplePrenom"
                  name="Prenom"
                  placeholder="Prenom"
                  value={Admin?.prenom}
                  onChange={(event: any) => {
                    setAdmin({
                      ...Admin,
                      prenom: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>

            <div className=" bd-highlight">
              <FormGroup>
                <Label
                  className="box1"
                  for="exampleEmail"
                  style={{ color: '#070f1b' }}
                >
                  Email
                </Label>
                <Input
                  className="box"
                  id="exampleEmail"
                  name="Email"
                  placeholder="Email"
                  value={Admin?.email}
                  onChange={(event: any) => {
                    setAdmin({
                      ...Admin,
                      email: event.target.value
                    });
                  }}
                />
              </FormGroup>
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
              EditAdmin();
            }}
          >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
