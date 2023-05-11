import { Button } from "reactstrap";
import { IAdmin } from "./Admin.type";
import "./AdminListe.style.css";

type Props = {
  list: IAdmin[];
  setAdminSelected: React.Dispatch<any>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};
const AdminList = (props: Props) => {
  const { 
    list,
     setAdminSelected, 
     setModal, 
     modal ,
     setUpdateData,
     updateData,
    } = props;

  function onUpdateAdmin(admin: any) {
    setAdminSelected(admin);
    setModal(!modal);
  }
  function deletePost(admin_id: any) {
    fetch(`http://localhost:5000/Admin/${admin_id}`, {
      method: "DELETE" });
      setUpdateData(!updateData);
   }

  return (
    <div>
      <article className="list-header">
        <h3>Liste des Admins</h3>
      </article>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        {list.map((admin: any, index: number) => {
          console.log(admin);
          return (
            <tr key={admin.admin_id}>
              <td>{`${admin.nom}`}</td>
              <td>{admin.prenom}</td>
              <td>{admin.email}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      color="primary"
                      onClick={() => {
                        onUpdateAdmin(admin);
                      }}
                    >
                      Modifier
                    </Button>
                  </div>

                  <div>
                    <Button
                      color="primary"
                      onClick={() => {
                        deletePost(admin.admin_id);
                      }}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AdminList;
