import { useState, useEffect } from "react";
import { IAdmin } from "./Admin.type";
import AdminList from "./AdminList";
import ModalAdmin from "./ModalAdmin";
import "./HomeA.style.css";

const Admin = () => {
  const [adminList, setAdminList] = useState([] as IAdmin[]);
  const [adminSelected, setAdminSelected] = useState<any>();
  const [type, setType] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [idSelected, setIdSelected] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  async function homeAdd() {
    fetch("http://localhost:5000/Admin")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setAdminList(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function getAdmin() {
    fetch("http://localhost:5000/Admin")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setAdminList(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    getAdmin();
  }, [updateData]);
  useEffect(() => {
    setNom(adminSelected?.nom);
    setPrenom(adminSelected?.prenom);
    setEmail(adminSelected?.email);
    setIdSelected(adminSelected?.admin_id);
  }, [adminSelected]);

  const _setAdminList = (list: IAdmin[]) => {
    setAdminList(list);
    window.localStorage.setItem("AdminList", JSON.stringify(list));
  };

  const deleteAdmin = (data: IAdmin) => {
    const indexToDelete = adminList.indexOf(data);
    const tempList = [...adminList];

    tempList.splice(indexToDelete, 1);
    _setAdminList(tempList);
  };
  const handleAddCategorie = () => {
    setType("add");
    setModal(!modal);
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
          <AdminList
            list={adminList}
            setAdminSelected={setAdminSelected}
            modal={modal}
            setModal={setModal}
            setUpdateData={setUpdateData}
            updateData={updateData}
          />
        </>
      </section>
      <ModalAdmin
        modal={modal}
        setModal={setModal}
        nom={Nom}
        prenom={Prenom}
        email={Email}
        type={type}
        setNom={setNom}
        setPrenom={setPrenom}
        setEmail={setEmail}
        idSelected={idSelected}
      />
    </>
  );
};

export default Admin;
