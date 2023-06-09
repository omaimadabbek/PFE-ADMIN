import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import logo from '../../../images/Restaurant_Dabbek.png';
import Swal from 'sweetalert2';
import './style.css';
const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(13)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dff5f6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 86%;
      height: 86%;
      display: block;
    }
`
);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function Connecter() {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/Admin/${email}/${password}`)
        .then((res) => res.json())
        .then((result) => {
          let data = result;
          console.log(result);

          if (result.length === 1) {
            //***Enregistre les données dans localStorage*/
            localStorage.setItem('User', JSON.stringify(data[0]));
            localStorage.setItem('Email', data[0].email);
            localStorage.setItem('prenom', data[0].prenom);
            localStorage.setItem('nom', data[0].nom);

            //***lire les données de localStorage*/
            if (data[0].type === 'Cassier') {
              navigate('dashboardsCaissier/commandesCassier');
            } else {
              navigate('dashboards/Admin');
            }

            window.location.reload();
          } else {
            //***pass ou email incorrect donc affiche swalalerte d'une erreur*/
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vérifier votre compte'
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10, col: 12 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} xl={12} mx="auto">
          <TypographyH1 className="title-cl" sx={{ mb: 2 }} variant="h1">
            Connectez-Vous
          </TypographyH1>
          <div className="d-flex flex-column bd-highlight mb-3">
            <div className=" bd-highlight ">
              <TextField
                style={{ width: '560px' }}
                sx={{ mt: 6, mb: 1 }}
                id="outlined-email-input"
                label="Email"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className=" bd-highlight ">
              <TextField
                style={{ width: '560px' }}
                sx={{ my: 1 }}
                id="outlined-password-input"
                label="Mot de passe"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className=" bd-highlight ">
              <Button
                sx={{ my: 1, mt: 6 }}
                size="large"
                variant="contained"
                onClick={Connecter}
                style={{ marginTop: '25px' }}
              >
                Se Connecter
              </Button>
            </div>
          </div>
          <Box sx={{ pb: 2, pt: 2 }}>
            Vous n'avez pas de Compte ?
            <span>
              <a
                style={{
                  color: '#5569ff',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
                href="/register"
                onClick={() => {
                  localStorage.setItem('register', 'true');
                }}
              >
                {' '}
                Inscrivez-vous
              </a>
            </span>
          </Box>

          <Grid container spacing={3} mt={5}>
            <Grid item md={12} sm={12}>
              <TsAvatar>
                <img
                  src={logo}
                  alt="Typescript"
                  style={{
                    width: '20rem',
                    height: '7rem',
                    marginBottom: '50px',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </TsAvatar>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ pb: 2 }}>&copy; 2023- Application</Box>
    </Container>
  );
}

export default Login;
