import { useState, useEffect } from "react";
import { ICommande } from "./Commande.type";
import CommandeList from "./CommandeList";
import "./HomeC.style.css";
import ModalCommandes from "./ModalCommande";


type Props = {
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>
  updateData:boolean
  DetailList:string
  setDetailList:React.Dispatch<React.SetStateAction<string>>
};
const Commande = () => {
  const [commandeList, setCommandeList] = useState([] as ICommande[]);
  const [commandeSelected, setCommandeSelected] = useState<any>();
  const [type, setType] = useState("");
  const [TotalCommande, setTotalCommande] = useState("");
  const [date_cmd, setDateCmd] = useState("");
  const [etat_commande, setEtat] = useState("");
  const [Client, setIdClient] = useState("");
  const [MDV, setMdv] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [idSelected, setIdSelected] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const[DetailList,setDetailList]=useState<any>();

  async function CommandeAdd() {
    fetch("http://localhost:5000/commandes")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setCommandeList(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
     
  }

  function getCommande() {
    fetch("http://localhost:5000/commandes")
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

  const _setCommandeList = (list: ICommande[]) => {
    setCommandeList(list);
    window.localStorage.setItem("CategorieList", JSON.stringify(list));
  };



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
