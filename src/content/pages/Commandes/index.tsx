import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import CommandeList from './CommandeList';
import './style.css';
function Commandes() {
  return (
    <>
      <Helmet>
        <title>Historique Des Commandes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <CommandeList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Commandes;
