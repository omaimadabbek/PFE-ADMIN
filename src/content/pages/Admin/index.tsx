import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import TextField from '@mui/material/TextField';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Divider, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from '../../../images/user.webp';
import { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import { Input } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Footer from 'src/components/Footer';
import Image from '../../overview/Login/Image';
import Swal from 'sweetalert2';

import './style.css';
import ModifierAdmin from './ModifierAdmin';
import DeleteAdmin from './DeleteAdmin';



export default function DashboardCrypto() {
  const [listAdmin, setListAdmin] = useState([]);

  const [selectedAdmin, setselectedAdmin] = useState<any>();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [Show, setShow] = useState<boolean>(false);
  const [Showdelete, setShowdelete] = useState<boolean>(false);

  const [showupdate, setShowupdate] = useState<boolean>(false);

  const [search, setSearch] = useState('');

  async function getlistAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/Admin`)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setListAdmin(data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  const handleSearchterm = (e: any) => {
    let value = e.target.value;
    setSearch(value);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    getlistAdmin();
    setIsUpdate(false);
  }, [isUpdate]);

  return (
    <>
      <Helmet>
        <title>Admins</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <div className=" Search d-flex justify-content-between  my-4">
        <Input
          className="ml-4"
          style={{ width: '285px' }}
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Rechercher..."
          onChange={(e) => {
            handleSearchterm(e);
          }}
        />
      </div>

      <Container maxWidth="lg">
        <div className="row">
          {listAdmin
            .filter((val: any) => {
              return val.nom.toLowerCase().includes(search.toLowerCase());
            })
            .map((Admin: any, index: number) => {
              return (
                <>
                  <div
                    className="col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2"
                    key={index}
                  >
                    <Card style={{ backgroundColor: '#e9e9e9' }}>
                      <CardHeader title="Fiche Admin" />
                      <Divider />
                      <CardContent>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="recipe">
                                {Admin.nom.slice(0, 1)}
                                {Admin.prenom.slice(0, 1)}
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={Admin.nom}
                            subheader={Admin.prenom}
                          />
                          <CardMedia
                            sx={{
                              height: 0,
                              paddingTop: '110%' // 16:9
                            }}
                            image={logo}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Email {''}: {''}
                              {Admin.email}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Tooltip title="Ajouter Administrateur">
                              <IconButton aria-label="add to favorites">
                                <EditIcon
                                  onClick={() => {
                                    setShowupdate(true);
                                    setselectedAdmin(Admin);
                                  }}
                                  style={{ color: '#5f72ff' }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Supprimer Administrateur">
                              
                              <IconButton aria-label="share">
                                <DeleteIcon
                                  onClick={() => {
                                    setShowdelete(true);
                                    setselectedAdmin(Admin);
                                  }}
                                  style={{ color: '#5f72ff' }}
                                />
                              </IconButton>
                            </Tooltip>
                          </CardActions>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                </>
              );
            })}
        </div>

        <ModifierAdmin
          show={showupdate}
          setShow={setShowupdate}
          selectedAdmin={selectedAdmin}
          setIsUpdate={setIsUpdate}
        />

        <DeleteAdmin
          selectedAdmin={selectedAdmin}
          show={Showdelete}
          setShow={setShowdelete}
          setIsUpdate={setIsUpdate}
        />
      </Container>
      <Footer />
    </>
  );
}
