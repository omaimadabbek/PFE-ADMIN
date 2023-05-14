import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';

function CommandeList() {
  const [listCommandes, setlistCommandes] = useState<any>();
  const [listAdmins, setlisteAdmins] = useState<any>([]);
  const [sctedetail, setsctedetail] = useState<any>();
  const [UpdateData, setUpdateData] = useState<any>();

  async function commandes() {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/commandes`)
        .then(async (response) => {
          // TO_CHAR(Date, 'YYYY-MM-DD')  as Date;
          const data = await response.json();
          console.log(data);
          setlistCommandes(data);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getsctedetails() {
    fetch(
      `${process.env.REACT_APP_API_URL}/getsctedetails/${localStorage.getItem(
        'user_id'
      )}`,
      {
        method: 'GET'
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setsctedetail(result);
        },

        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    commandes();
    getsctedetails();
  }, [UpdateData]);
  return (
    <Card>
      {/** TableCommande */}
      <RecentOrdersTable
        cryptoOrders={listCommandes}
        statusOptions={listAdmins}
        sctedetail={sctedetail}
        setUpdateData={setUpdateData}
        updateData={UpdateData}
      />
    </Card>
  );
}

export default CommandeList;
