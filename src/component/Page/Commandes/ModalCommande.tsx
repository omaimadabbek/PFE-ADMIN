
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

type ModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  DetailList: any;
};

const ModalCommandes = ({ modal, DetailList, setModal }: ModalType) => {

 

  return (
    
    <Modal isOpen={modal} style={{}}>
      <ModalHeader className="d-flex justify-content-center" style={{fontFamily:"fantasy",fontStyle:"oblique"}}>Detail Commande</ModalHeader>
      <ModalBody>
        {DetailList?.map((detail: any) => {
          console.log("detail", detail)
          return (
          <div>
           <div className="d-flex justify-content-start">
            <div  style={{fontWeight:"bolder"}}> Date: </div>
            <div  style={{fontWeight:"normal"}}> " {detail.date_detail_cmd.substring(0, 10)} "</div> 
            </div>
            <div className="d-flex justify-content-start">
              <div style={{fontWeight:"bolder"}}>Designation: </div>
              <div style={{fontWeight:"normal"}}>" {detail.designation} "</div>
              </div>
            <div className="d-flex justify-content-start">
              <div style={{fontWeight:"bolder"}}> Quantité: </div>
              <div style={{fontWeight:"normal"}}>" {detail.quantité} "</div> 
              </div>
            <div className="d-flex justify-content-start">
              <div style={{fontWeight:"bolder"}}> Prix: </div>
              <div style={{fontWeight:"normal"}}>" {detail.prix}$ "</div>
              </div>
            <div className="d-flex justify-content-start">
              <div style={{fontWeight:"bolder"}}> Nom: </div>
              <div style={{fontWeight:"normal"}}>" {detail.nom} "</div>
              </div><hr/>
            

            </div>
          
               
            );
        })}
        <div>
               <div className="p-2 flex-grow-1 bd-highlight" style={{fontWeight:"bolder"}}>Sous Total: </div><hr/>
               <div className="p-2 flex-grow-1 bd-highlight" style={{marginRight:"200px",fontWeight:"bolder"}}>Frais de livraison: </div><hr/>
               <div className="p-2 flex-grow-1 bd-highlight" style={{marginRight:"200px",fontWeight:"bolder"}}>Total euros: </div><hr/>
               </div>
         
           
      </ModalBody>
      <ModalFooter>
       
        <Button color="secondary" onClick={() => setModal(!modal)}>
          Back
        </Button>

      </ModalFooter>
   
    </Modal>
  );
};
export default ModalCommandes;


