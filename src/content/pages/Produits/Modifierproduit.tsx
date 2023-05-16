import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Input, Label } from 'reactstrap';
import Image from '../../overview/Login/Image';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import ReactSwitch from 'react-switch';

type Modifierproduit = {
  selectedProduit: any;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

//eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Modifierproduit({
  selectedProduit,
  show,
  setShow,
  setIsUpdate
}: Modifierproduit) {
  const [Produit, setProduit] = useState(selectedProduit);

  const [imageproduit, setImage] = useState();

  const [isChecked, setIsChecked] = useState(
    selectedProduit?.repture_de_stock === 'on' ? true : false
  );
  const handleClose = () => setShow(false);

  async function EditProduit() {
    if (imageproduit !== Produit.image) {
      var formData = new FormData();
      let img: any = imageproduit;
      for (const i of Object.keys(img)) {
        formData.append('imgCollection', img[i as unknown as number]);
      }
      await fetch(`${process.env.REACT_APP_API_URL}/uploadImage`, {
        body: formData,
        method: 'POST'
      })
        .then((response) => response.json())
        .then((data: any) => {
          updateProduct(data);
        });
    } else {
      updateProduct(Produit.image);
    }
  }

  async function updateProduct(urlImage: any) {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/produits/${Produit.id_produit}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Categorie: Produit.id_categorie,
          nom: Produit.nom,
          prix: Produit.prix,
          image: urlImage,
          repture_de_stock: Produit.repture_de_stock,
          description: Produit.description
        })
      }).then((response) => response.json());
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

  const handleChange = (checked) => {
    setIsChecked(checked);
    setProduit({
      ...Produit,
      repture_de_stock: checked ? 'on' : 'off'
    });
  };
  React.useEffect(() => {
    setProduit(selectedProduit);
    setIsChecked(selectedProduit?.repture_de_stock === 'on' ? true : false);
    setImage(selectedProduit?.image);
  }, [selectedProduit]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <div className="justify-content-center">
          <Modal.Title>Modifier un produit</Modal.Title>
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
                value={Produit?.nom}
                onChange={(event: any) => {
                  setProduit({
                    ...Produit,
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
                Prix
              </Label>
              <Input
                className="box"
                id="prix"
                name="prix"
                placeholder="prix"
                value={Produit?.prix}
                onChange={(event: any) => {
                  setProduit({
                    ...Produit,
                    prix: event.target.value
                  });
                }}
              />
            </FormGroup>
          </div>

          <div className="bd-highlight">
            <FormGroup>
              <Label
                className="box1"
                for="exampledescription"
                style={{ color: '#070f1b' }}
              >
                Description{' '}
              </Label>
              <Input
                className="box"
                id="exampleDescription"
                name="Description"
                placeholder="Description"
                value={Produit?.description}
                onChange={(event: any) => {
                  setProduit({
                    ...Produit,
                    description: event.target.value
                  });
                }}
              />
            </FormGroup>
          </div>

          <div className="d-flex bd-highlight d-flex align-items-center">
            <div className="p-2 flex-grow-1 bd-highlight">
              {' '}
              <Label
                className="box1"
                for="exampledescription"
                style={{ color: '#070f1b' }}
              >
                Repture De Stock{' '}
              </Label>
            </div>
            <div className="p-2 bd-highlight">
              <ReactSwitch
                checked={isChecked}
                onChange={handleChange}
                activeBoxShadow="0px 0px 1px 10px #000000"
                boxShadow="0px 1px 5px 0px #000000"
                handleDiameter={26}
                offColor="#f7b4b8"
                offHandleColor="#E30613"
                onColor="#c2eddd"
                onHandleColor="#34C38F"
                width={55}
                height={20}
              />
            </div>
          </div>

          <div className=" bd-highlight mt-3">
            <Image setImage={setImage} images={selectedProduit?.image} />
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
            EditProduit();
          }}
        >
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
