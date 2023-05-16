import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';

import { FcApproval } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';

import PropTypes from 'prop-types';

import {
  Divider,
  Box,
  Button,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader
} from '@mui/material';

import { CryptoOrder } from 'src/models/crypto_order';
import ModalDetail from './ModalDetail';
interface CommandeListProps {
  cryptoOrders: any;
  statusOptions: any;
  sctedetail: any;
  setUpdateData: Function;
  updateData: boolean;
}

interface Filters {
  nomclient?: string;
}

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.nomclient && cryptoOrder.nomclient !== filters.nomclient) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const TableCommande: FC<CommandeListProps> = ({
  cryptoOrders,
  statusOptions,
  sctedetail,
  setUpdateData,
  updateData
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [show, setShow] = useState(false);
  const [Nomclient, setNomclient] = useState('');
  const [idcommande, setidcommande] = useState(0);
  const [datecommande, setdatecommande] = useState();
  const [totcommande, settotcommande] = useState();
  const [filters, setFilters] = useState<Filters>({
    nomclient: null
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  async function onUpdateCmd(
    id_commandes: number,
    etat_commande: string,
    idClient: string
  ) {
    fetch(`${process.env.REACT_APP_API_URL}/commandes/${id_commandes}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etat_commande, idClient })
    })
      .then((response) => {
        console.log('bb', response);

        response.json();
      })

      .catch((error) => {
        console.error('There was an error!', error);
      });
    setUpdateData(!updateData);
  }

  return (
    <>
      <Card>
        <Divider />
        <TableContainer style={{ backgroundColor: '#e9e9e9' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#cecece' }}>
                <TableCell>N° de Commande</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Montant Total</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Mode De Vente</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Detail Commande</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders.map((cryptoOrder: any) => {
                return (
                  <TableRow hover key={cryptoOrder.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.id_commandes}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.nom}
                        {'  '}
                        {cryptoOrder.prenom}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.date_cmd.substring(0, 10)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.totalcommande} €
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.adresse}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.etat_commande === '1' && (
                          <div className="d-flex justify-content-center">
                            <FcApproval />
                          </div>
                        )}
                        {cryptoOrder.etat_commande === '2' && (
                          <div className="d-flex justify-content-center">
                            <FcCancel />
                          </div>
                        )}

                        {cryptoOrder.etat_commande === '3' && (
                          <div className="d-flex justify-content-center">
                            {'RxTimer '}
                          </div>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.etat_commande === '1' && (
                          <div className="d-flex justify-content-center">
                            Acceptée
                          </div>
                        )}

                        {cryptoOrder.etat_commande === '2' && (
                          <div className="d-flex justify-content-center">
                            Refusé
                          </div>
                        )}

                        {cryptoOrder.etat_commande === '3' && (
                          <div className="d-flex justify-content-center">
                            <div style={{ marginRight: '10px' }}>
                              <Button
                                color="primary"
                                onClick={() => {
                                  onUpdateCmd(
                                    cryptoOrder.id_commandes,
                                    '1',
                                    cryptoOrder.id_client
                                  );
                                }}
                              >
                                Accepter
                              </Button>
                            </div>
                            <div style={{ marginRight: '10px' }}>
                              <Button
                                color="primary"
                                onClick={() => {
                                  onUpdateCmd(
                                    cryptoOrder.id_commandes,
                                    '2',
                                    cryptoOrder.id_client
                                  );
                                }}
                              >
                                Refuser
                              </Button>
                            </div>
                          </div>
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setNomclient(
                            `${cryptoOrder.nom} ${cryptoOrder.prenom}`
                          );
                          setidcommande(cryptoOrder.id_commandes);
                          setdatecommande(cryptoOrder.date_cmd);
                          settotcommande(cryptoOrder.totalcommande);
                          setShow(true);
                        }}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2} style={{ backgroundColor: '#e9e9e9' }}>
          <TablePagination
            component="div"
            count={filteredCryptoOrders.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
      <ModalDetail
        show={show}
        setShow={setShow}
        idcommande={idcommande}
        Nomclient={Nomclient}
        sctedetail={sctedetail}
        datecommande={datecommande}
        totcommande={totcommande}
      />
    </>
  );
};

TableCommande.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

TableCommande.defaultProps = {
  cryptoOrders: []
};

export default TableCommande;
