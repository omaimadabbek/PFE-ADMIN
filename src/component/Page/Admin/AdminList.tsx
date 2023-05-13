
import { IAdmin } from "./Admin.type";
import "./AdminListe.style.css";
import { FaUserEdit } from "react-icons/fa";
import { HiUserRemove } from "react-icons/hi";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  list: IAdmin[];
  setAdminSelected: React.Dispatch<any>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};
const AdminList = (props: Props) => {
  const { list, setAdminSelected, setModal, modal, setUpdateData, updateData } =
    props;

  function onUpdateAdmin(admin: any) {
    setAdminSelected(admin);
    setModal(!modal);
  }
  function deletePost(admin_id: any) {
    fetch(`${process.env.REACT_APP_API_URL}/Admin/${admin_id}`, {
      method: "DELETE",
    });
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
                  <Tooltip title="Modifier Admin" arrow>
                    <div
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "orange",
                      }}
                      onClick={() => {
                        onUpdateAdmin(admin);
                      }}
                    >
                      <FaUserEdit />
                    </div>
                  </Tooltip>
                  <Tooltip title="Supprimer Admin" arrow>
                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "x-large",
                        color: "red",
                      }}
                      onClick={() => {
                        deletePost(admin.admin_id);
                      }}
                    >
                      <HiUserRemove />
                    </div>
                  </Tooltip>
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
