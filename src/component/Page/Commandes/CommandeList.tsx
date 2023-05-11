import { Button } from "reactstrap";
import { ICommande } from "./Commande.type";
import "./CommandeListe.style.css";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { RxTimer } from "react-icons/rx";
import { useEffect} from "react";

type Props = {
  list: ICommande[];
  setCommandeSelected: React.Dispatch<any>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
  idSelected: number;
  etat_commande: string;
  DetailList:string;
  setDetailList: React.Dispatch<React.SetStateAction<string>>;
};


const CommandeList = (props: Props) => {
  const {
    list,
    setCommandeSelected,
    setUpdateData,
    updateData,
    modal,
    setModal,
    DetailList,
    setDetailList
  } = props;

  async function onUpdateCmd(id_commandes: number, etat_commande: string) {
    setCommandeSelected(id_commandes);

    fetch(`http://localhost:5000/commandes/${id_commandes}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ etat_commande }),
    })
      .then((response) => response.json())

      .catch((error) => {
        console.error("There was an error!", error);
      });

    setUpdateData(!updateData);
  };
  function getDetail(id_commandes:any){

    fetch(`http://localhost:5000/detail_commandes/${id_commandes}`)
          .then(async response => {
              const data = await response.json()
              setDetailList(data)
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
          
          setModal  (!modal)
}


  return (
    <div>
      <article className="list-header">
        <h3>Liste de Commande</h3>
      </article>

      <table>
        <thead>
          <tr>
            <th> Date Commande</th>
            <th>Total Commande</th>
            <th>Client</th>
            <th>Action</th>
            <th>Mode De Vente</th>
            <th>Adresse</th>
            <th>Detail Commande</th>
          </tr>
        </thead>

        {list?.map((commande: any, index: number) => {

          return (
            <tr key={commande.id_commandes}>
              <td>{commande.date_cmd.substring(0, 10)}</td>
              <td>{commande.totalcommande} $</td>
              <td>
                {commande.prenom} {commande.nom}
              </td>
              <td>
                {commande.etat_commande === "1" && (
                  <div className="d-flex justify-content-center">Acceptée</div>
                )}

                {commande.etat_commande === "2" && (
                  <div className="d-flex justify-content-center">Refusé</div>
                )}

                {commande.etat_commande === "3" && (
                  <div className="d-flex justify-content-center">
                    <div style={{ marginRight: "10px" }}>
                      <Button
                        color="primary"
                        onClick={() => {
                          onUpdateCmd(commande.id_commandes, "1");
                        }}
                      >
                        Accepté
                      </Button>
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      <Button
                        color="primary"
                        onClick={() => {
                          onUpdateCmd(commande.id_commandes, "2");
                        }}
                      >
                        {" "}
                        Refusé
                      </Button>
                    </div>
                  </div>
                )}
              </td>
              <td>
                {commande.etat_commande === "1" && (
                  <div className="d-flex justify-content-center">
                    <FcApproval />
                  </div>
                )}
                {commande.etat_commande === "2" && (
                  <div className="d-flex justify-content-center">
                    <FcCancel />
                  </div>
                )}

                {commande.etat_commande === "3" && (
                  <div className="d-flex justify-content-center">
                    {" "}
                    <RxTimer />
                  </div>
                )}
              </td>
              <td>{commande.adresse}</td>
              <td>
                <div style={{ marginRight: "10px" }} 
                onClick={()=>{getDetail(commande.id_commandes)}}>
                  <Button color="secondary"> Panier </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default CommandeList;
