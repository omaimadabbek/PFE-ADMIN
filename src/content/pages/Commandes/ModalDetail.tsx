import Button from '@mui/material/Button/Button';
import { useEffect, useRef, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import ReactToPrint from 'react-to-print';

import Facture from './Facture';

type Modaltype = {
  show: boolean;
  setShow: Function;
  idcommande: any;
  Nomclient: any;
  sctedetail: any;
  datecommande: any;
  totcommande: any;
};

function ModalDetail({
  show,
  setShow,
  idcommande,
  Nomclient,
  sctedetail,
  datecommande,
  totcommande
}: Modaltype) {
  const [commande, setcommande] = useState<any>();

  const componentRef = useRef<HTMLDivElement>(null);

  async function getDetailCommande() {
    fetch(`${process.env.REACT_APP_API_URL}/detail_commandes/${idcommande}`)
      .then(async (response) => {
        const data = await response.json();
        setcommande(data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
    getDetailCommande();
  }, [idcommande, Nomclient]);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="d-flex justify-content-between">
          <div style={{ width: '250px' }}>
            <h6 style={{ color: 'blue' }}>
              Détail de la commande N° {idcommande}
            </h6>
            <h6>Nom : {Nomclient}</h6>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <table className="table mt-5 text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Designation</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* ? => si detailCmd est vide ne la prend pas*/}
              {commande?.map((data: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.designation}</td>
                    <td>{data.quantité}</td>
                    <td>{data.prix} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Fermer</Button>
        <ReactToPrint
          trigger={() => <Button>Imprimer </Button>}
          content={() => componentRef.current}
        />

        <Facture
          componentRef={componentRef}
          commande={commande}
          sctedetail={sctedetail}
          client={Nomclient}
          idcommande={idcommande}
          datecommande={datecommande}
          totcommande={totcommande}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDetail;
