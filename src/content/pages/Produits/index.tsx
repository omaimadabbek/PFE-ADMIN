import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Container, Input } from 'reactstrap';
import AddchartIcon from '@mui/icons-material/Addchart';
import Footer from 'src/components/Footer';
import { Card, CardHeader, CardContent, Divider, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './style.css';
import Modifierproduit from './Modifierproduit';
import Addproduit from './Addproduit';
import Deleteproduit from './Deleteproduit';

export default function DashboardCrypto() {
  const [listproduit, setListproduit] = useState([]);
  const [selectedProduit, setselectedProduit] = useState<any>();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [search, setSearch] = useState<any>('');

  const [showadd, setShowadd] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [showupdate, setShowupdate] = useState(false);

  async function listeproduits() {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/produits`)
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          setListproduit(data);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchterm = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    listeproduits();
    setIsUpdate(false);
  }, [isUpdate]);

  return (
    <>
      <Helmet>
        <title>Produits</title>
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
        <div className="d-flex justify-content-end px-4">
          <Tooltip title="Ajouter Produit">
            
            <IconButton aria-label="add to favorites">
              <AddchartIcon
                onClick={() => {
                  setShowadd(true);
                }}
                style={{ color: '#5f72ff' }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Container maxWidth="lg">
        <div className="row">
          {listproduit
            .filter((val: any) => {
              return val.nom.toLowerCase().includes(search.toLowerCase());
            })
            .map((Produit: any, index: number) => {
              return (
                <>
                  <div className="col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2">
                    <Card key={index} style={{ backgroundColor: '#e9e9e9' }}>
                      <CardHeader title="Fiche Produit" />
                      <Divider />
                      <CardContent>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="recipe">
                                {' '}
                                {Produit.nom.slice(0, 1)}
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={Produit.nom}
                            subheader={Produit.prix + ' €'}
                          />
                          <CardMedia
                            sx={{
                              height: 0,
                              paddingTop: '100%' // 16:9
                            }}
                            image={Produit.image}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Prix {''}: {''}
                              {Produit.prix + ' €'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Description {''}: {''}
                              {Produit.description}
                            </Typography>
                          </CardContent>
                          {/** Ajoute ,Modifer */}
                          <CardActions disableSpacing>
                            <Tooltip title="Modifier Produit">
                              <IconButton aria-label="add to favorites">
                                <EditIcon
                                  onClick={() => {
                                    setShowupdate(true);
                                    setselectedProduit(Produit);
                                  }}
                                  style={{ color: '#5f72ff' }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Supprimer Produit">
                              <IconButton aria-label="share">
                                <DeleteIcon
                                  onClick={() => {
                                    setShowdelete(true);
                                    setselectedProduit(Produit);
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
        {/*** Modifierproduit*/}
        <Modifierproduit
          selectedProduit={selectedProduit}
          show={showupdate} // mise ajour
          setShow={setShowupdate}
          setIsUpdate={setIsUpdate}
        />
        <Addproduit
          show={showadd}
          setShow={setShowadd}
          setIsUpdate={setIsUpdate}
        />
        <Deleteproduit
          Produit={selectedProduit}
          show={showdelete}
          setShow={setShowdelete}
          setIsUpdate={setIsUpdate}
        />
      </Container>
      <Footer />
    </>
  );
}
