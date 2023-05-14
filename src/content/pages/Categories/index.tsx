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
import Modifierproduit from './Modifiercategorie';
import Addproduit from './Addcategorie';
import Deleteproduit from './Deletecategorie';
import Modifiercategorie from './Modifiercategorie';
import Deletecategorie from './Deletecategorie';
import Addcategorie from './Addcategorie';

export default function DashboardCrypto() {
  const [listcategorie, setListcategorie] = useState([]);
  const [selectedcategorie, setselectedcategorie] = useState<any>();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [search, setSearch] = useState<any>('');

  const [showadd, setShowadd] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [showupdate, setShowupdate] = useState(false);

  async function listecategorie() {
    fetch(`${process.env.REACT_APP_API_URL}/categorie`).then(
      async (response) => {
        const data = await response.json();
        setListcategorie(data);
        let result: any = [];
        data.forEach((element: any, index: any) => {
          result.push({
            value: element.id_categorie,
            label: element.nom_categorie
          });
        });
      }
    );
  }

  const handleSearchterm = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    listecategorie();
    setIsUpdate(false);
  }, [isUpdate]);

  return (
    <>
      <Helmet>
        <title>Categories </title>
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
          <Tooltip title="Ajouter Categorie">
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
          {listcategorie
            .filter((val: any) => {
              return val.nom_categorie
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((Item: any, index: number) => {
              return (
                <>
                  <div className="col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2">
                    <Card key={index} style={{ backgroundColor: '#e9e9e9' }}>
                      <CardHeader title="Fiche Categories " />
                      <Divider />
                      <CardContent>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="recipe">
                                {' '}
                                {Item.nom_categorie.slice(0, 1)}
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={Item.nom_categorie}
                            subheader={' '}
                          />
                          <CardMedia
                            sx={{
                              height: 0,
                              paddingTop: '100%' // 16:9
                            }}
                            image={Item.image}
                          />

                          {/** Ajoute ,Modifer */}
                          <CardActions disableSpacing>
                            <Tooltip title="Modifier Categorie">
                              <IconButton aria-label="add to favorites">
                                <EditIcon
                                  onClick={() => {
                                    setselectedcategorie(Item);
                                    setShowupdate(true);
                                  }}
                                  style={{ color: '#5f72ff' }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Supprimer Categorie">
                             
                              <IconButton aria-label="share">
                                <DeleteIcon
                                  onClick={() => {
                                    setselectedcategorie(Item);
                                    setShowdelete(true);
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
        {/*** Modifierp*/}
        <Modifiercategorie
          selectedcategorie={selectedcategorie}
          show={showupdate} // mise ajour
          setShow={setShowupdate}
          setIsUpdate={setIsUpdate}
        />
        <Addcategorie
          show={showadd}
          setShow={setShowadd}
          setIsUpdate={setIsUpdate}
        />
        <Deletecategorie
          selectedcategorie={selectedcategorie}
          show={showdelete}
          setShow={setShowdelete}
          setIsUpdate={setIsUpdate}
        />
      </Container>
      <Footer />
    </>
  );
}
