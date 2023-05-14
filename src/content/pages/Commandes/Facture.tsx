import React from 'react';

type Facturetype = {
  commande: any;
  sctedetail: any;
  client: any;
  totcommande: any;
  datecommande: any;
  idcommande: any;
  componentRef: React.MutableRefObject<HTMLDivElement>;
};
function Facture({
  commande,
  sctedetail,
  client,
  idcommande,
  datecommande,
  totcommande,
  componentRef
}: Facturetype) {
  return (
    <div style={{ display: 'none' }}>
      <div ref={componentRef}>
        <div>
          <div
            className="d-flex justify-content-center mt-5"
            style={{ height: '50px' }}
          >
            <div>
              <h4>FACTURE </h4>
            </div>
          </div>

          <div className="d-flex justify-content-between d-flex align-items-center px-5">
            <div>
              <div>
                <h6>Nom : {client}</h6>
              </div>
            </div>
            <div>
              <h6>Date : {datecommande}</h6>
              <h6>N° : {idcommande}</h6>
              <h6>TOTAL : {totcommande} €</h6>
            </div>
          </div>

          <div className="d-flex justify-content-between"></div>

          <div className="d-flex justify-content-center">
            <table className="table mt-5 text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>designation</th>
                  <th>Prix </th>
                  <th>Quantité</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {commande?.map((data: any, index: number) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1} </td>
                      <td>{data.designation}</td>
                      <td>{data.prix} €</td>
                      <td>{data.quantité}</td>
                      <td>{data.prix} €</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facture;
