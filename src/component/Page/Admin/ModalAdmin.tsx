import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

type ModalType={
    modal:boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    nom:string
    prenom:string
    email:string
    type:string
    setNom: React.Dispatch<React.SetStateAction<string>>
    setPrenom: React.Dispatch<React.SetStateAction<string>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    idSelected:number
}

 const ModalAdmin=({modal,
  setModal,
  nom,
  prenom,
  email,
  type,
  setNom,
  setPrenom,
  setEmail,
  idSelected
}:ModalType)=>{
  async function AddAdmin (){
    fetch(`${process.env.REACT_APP_API_URL}/Admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("There was an error!", error);
      });
      setModal(!modal)
  }
  async function updateAdmin (){
    fetch(`${process.env.REACT_APP_API_URL}/Admin/${idSelected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email:email,
        }),
  })
        .then((response) => response.json())
        .catch((error) => {
        
          console.error("There was an error!", error);
      });
      setModal(!modal)
  }
 
  
 
    return(
        <Modal isOpen={modal} >
        <ModalHeader  className="d-flex justify-content-center" style={{fontFamily:"fantasy",fontStyle:"oblique"}}>
          Modifier admin</ModalHeader>
        <ModalBody>
        
        <FormGroup className="d-flex justify-content-start">
    <Label for="exampleNom" style={{ fontWeight:"bolder" }} 
    sm={2}>
     Nom
    </Label>
    <Col sm={10}>
    <Input
     placeholder="Nom"
       name="Nom"
       type="text"
       value={nom}
      onChange={(e:any)=>{
          setNom(e.target.value)
        }
        }
          />
                       </Col>
  </FormGroup>


  <FormGroup className="d-flex justify-content-start">
    <Label for="examplePrenom"  style={{ fontWeight:"bolder" }} 
    sm={2}>
     Prenom
    </Label>
    <Col sm={10}>
    <Input
    placeholder="Prenom"
      name="Prenom"
      type="text"
      value={prenom}
      onChange={(e:any)=>{
        setPrenom(e.target.value)
      }
      }/>
     </Col>
  </FormGroup >

  <FormGroup className="d-flex justify-content-start">
    <Label for="exampleEmail"  style={{ fontWeight:"bolder" }} 
    sm={2}>
     Email
    </Label>
    <Col sm={10}>
    <Input
    placeholder="Email"
      name="Email"
      type="text"
      value={email}
      onChange={(e:any)=>{
        setEmail(e.target.value)
      }
      }/>
     </Col>
  </FormGroup>

 <br />
          
          
        </ModalBody>
        <ModalFooter >
          <Button color="primary" margin="auto" onClick={(()=>type==="add"?AddAdmin():updateAdmin())}  >
          {type==="add"?"Ajouter Admin":"Modifier Admin "} 
          </Button>{' '}
          <Button color="secondary"  onClick={ () => setModal(!modal)}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    )
}
export default ModalAdmin