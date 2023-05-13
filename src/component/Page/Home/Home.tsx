import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Home.style.css";
import Swal from "sweetalert2";

export default function Home() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mdp, setMdp] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const navigate = useNavigate();
  //const [inscrire, setInscrire] = useState(false);
  // const [identifier, setIdentifier] = useState(false);
  const [modal, setModal] = useState(false);

  async function AddAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/Admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        mot_de_passe: mdp,
        email: email,
        type: isAdmin,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("Nouveau Utilisateur!", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Un champ vide",
          });
        }
        response.json();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setModal(!modal);
  }

  // ***fonction get*/
  // ***ajouter condtion pour faire sweetalert2*/

  function getAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/Admin/${email}/${mdp}`)
      .then((res) => res.json())
      .then((result) => {
        let data = result;
        console.log(result);

        if (result.length === 1) {
          //***Enregistre les données dans localStorage*/
          localStorage.setItem("User", JSON.stringify(data[0]));

          //***getItem:Cette méthode est utilisée pour obtenir un élément de localStorage à l'aide de la clé*/
          let newObject: any = window.localStorage.getItem("User");
          //***lire les données de localStorage*/
          console.log("JSON", JSON.parse(newObject));

          navigate("/Categorie");
          window.location.reload();
        } else {
          //***pass ou email incorrect donc affiche swalalerte d'une erreur*/
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vérifier votre compte",
          });
        }
      });
  }
  // const cnx = () => {
  //   setIdentifier(false);
  //   setModal(!modal);
  // };

  return (
    <div className="bodyLogin__CLZ">
      <div className="main">
        <input
          className="input_login__CLZ"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form>
            <label
              className="label_login__CLZ"
              htmlFor="chk"
              aria-hidden="true"
            >
              Inscription
            </label>
            <input
              className="input_login__CLZ"
              type="text"
              name="txt"
              placeholder="Nom"
              onChange={(e: any) => setNom(e.target.value)}
            />
            <input
              className="input_login__CLZ"
              type="text"
              name="txt"
              placeholder="Prenom"
              onChange={(e: any) => setPrenom(e.target.value)}
            />
            <input
              className="input_login__CLZ"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <input
              className="input_login__CLZ"
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(e: any) => setMdp(e.target.value)}
            />

            <div className="radio__clz">
              <div style={{ marginRight: "20px" }}>
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    id="Admin"
                    value="Admin"
                    onChange={(e: any) => setIsAdmin("Admin")}
                  />{" "}
                  <Label check>Admin</Label>
                </FormGroup>
              </div>

              <FormGroup check>
                <Input
                  name="radio1"
                  type="radio"
                  id="Cassier"
                  value="Cassier"
                  onChange={(e: any) => setIsAdmin("Cassier")}
                />{" "}
                <Label check>Cassier</Label>
              </FormGroup>
            </div>

            <button
              className="button_login__CLZ"
              onClick={() => {
                AddAdmin();
              }}
            >
              Inscription
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label
              className="label_login__CLZ"
              htmlFor="chk"
              aria-hidden="true"
            >
              Connexion
            </label>
            <input
              className="input_login__CLZ"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="input_login__CLZ"
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(e: any) => {
                setMdp(e.target.value);
              }}
            />
            <button
              className="button_login__CLZ"
              onClick={(e) => {
                e.preventDefault();
                getAdmin();
              }}
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
