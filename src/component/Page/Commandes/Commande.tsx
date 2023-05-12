import { useState, useEffect } from "react";
import { ICommande } from "./Commande.type";
import CommandeList from "./CommandeList";
import "./HomeC.style.css";
import ModalCommandes from "./ModalCommande";



const Commande = () => {
  const [commandeList, setCommandeList] = useState([] as ICommande[]);
  const [commandeSelected, setCommandeSelected] = useState<any>();
  const [, setTotalCommande] = useState("");
  const [, setDateCmd] = useState("");
  const [, setEtat] = useState("");
  const [, setIdClient] = useState("");
  const [, setMdv] = useState("");
  const [, setAdresse] = useState("");
  const [, setIdSelected] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const[DetailList,setDetailList]=useState<any>();

 

  function getCommande() {
    fetch(`${process.env.REACT_APP_API_URL}/commandes`)
      .then(async (response) => {
        // TO_CHAR(Date, 'YYYY-MM-DD')  as Date;
        const data = await response.json();
        console.log(data);
        setCommandeList(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
     
}

  useEffect(() => {
    getCommande();
    
  }, [updateData]);
  
  useEffect(() => {
    setDateCmd(commandeSelected?.date_cmd);
    setTotalCommande(commandeSelected?.totalcommande);
    setEtat(commandeSelected?.etat_commande);
    setIdClient(commandeSelected?.id_client);
    setMdv(commandeSelected?.mdv);
    setAdresse(commandeSelected?.adresse);
    setIdSelected(commandeSelected?.id_commandes);
  }, [commandeSelected]);

 



  return (
    <>
      <article className="article-header">
        <header>
          <h1>Restaurant Dabbek</h1>
        </header>
      </article>

      <section className="section-content">
        <>
          <CommandeList
            list={commandeList}
            setCommandeSelected={setCommandeSelected}
            modal={modal}
            setModal={setModal}
            setUpdateData={setUpdateData}
            updateData={updateData} 
            idSelected={0} 
            etat_commande={""} 
            setDetailList={setDetailList}
            DetailList={""}
            />
        </>
      </section>
      <ModalCommandes
        modal={modal}
        setModal={setModal}
        DetailList={DetailList}
      />
     
      
    </>
  );
};

export default Commande;
