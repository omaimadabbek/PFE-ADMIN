import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import { Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import Image from '../../overview/Login/Image';
import ReactSwitch from 'react-switch';
type deleteproduit = {
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function Addproduit({ show, setShow, setIsUpdate }: deleteproduit) {
  const handleShow = () => setShow(true);
  const [isChecked, setIsChecked] = useState(false);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [imageproduit, setImage] = useState('');
  const [repture_de_stock, setReptureDeStock] = useState('off');
  const [id_categorie, setCategorie] = useState<any>('');
  const [listeCategorie, setListeCategorie] = useState<any>([]);

  let imageProfile = '${process.env.REACT_APP_API_URL}/product.png';

  const handleClose = () => {
    setNom('');
    setPrix('');
    setImage('');
    setDescription('');
    setShow(false);
  };

  const handleChange = (checked) => {
    setIsChecked(checked);
    console.log(
      '🚀 ~ file: Addproduit.tsx:39 ~ handleChange ~ checked:',
      checked
    );
  };

  function addproduit(image: string) {
    if (prix && nom && description && image && id_categorie) {
      fetch(`${process.env.REACT_APP_API_URL}/produits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_categorie: Number(id_categorie),
          nom: nom,
          prix: prix,
          image: image,
          repture_de_stock: isChecked ? 'on' : 'off',
          description: description
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdate(true);
          Swal.fire({
            title: 'Un nouveau produit a été ajouté',
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

  function getCategorie() {
    fetch(`${process.env.REACT_APP_API_URL}/categorie`)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        let result: any = [];
        data.forEach((element: any, index: any) => {
          result.push({
            value: element.id_categorie,
            label: element.nom_categorie
          });
        });
        setListeCategorie(result);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  async function AjouterProduct() {
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
            addproduit(data);
          });
      } else {
        addproduit(imageProfile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategorie();
  }, []);
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un produit</Modal.Title>
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
          <div className=" bd-highlight ">
            <TextField
              style={{ width: '370px' }}
              sx={{ mb: 1 }}
              id="outlined-prenom-input"
              label="Prix"
              type="text"
              value={prix}
              onChange={(e: any) => {
                setPrix(e.target.value);
              }}
            />
          </div>

          <div className=" bd-highlight ">
            <TextField
              style={{ width: '370px' }}
              sx={{ mb: 1 }}
              id="outlined-description-input"
              label="Description"
              type="description"
              autoComplete="current-description"
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className=" bd-highlight ">
            <Label
              for="exampleCategorie"
              sm={2}
              style={{ fontWeight: 'bolder' }}
            >
              Categorie
            </Label>
            <Input
              style={{ width: '390px', marginLeft: '13px' }}
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(el: any) => {
                setCategorie(el.target.value);
              }}
            >
              {listeCategorie?.map((element: any) => {
                // eslint-disable-next-line react/jsx-key
                return <option value={element.value}>{element.label}</option>;
              })}
            </Input>
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
            <Image setImage={setImage} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button type="button" variant="contained" onClick={AjouterProduct}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addproduit;
