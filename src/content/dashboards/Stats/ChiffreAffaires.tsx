import {

  Box,

  Typography,

  styled,
  Avatar,

} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';

import { useEffect, useState } from 'react';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

function ChiffreAffaires() {
  const [Sum, SetSum] = useState('0');
  async function SumCommande() {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/Totalcmd/${localStorage.getItem(
          'user_id'
        )}`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          SetSum(data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    SumCommande();
  }, []);

  return (
    <div className="px-3 mt-5">
      <h4 className="my-3" style={{color:"blue"}}> Chiffre d'Affaires </h4>
      <div className="px-2">
        <Box>
          <Box
            display="flex"
            sx={{
              py: 4
            }}
            alignItems="center"
          >
            <AvatarSuccess
              sx={{
                mr: 2
              }}
              variant="rounded"
            >
              <TrendingUp fontSize="large" />
            </AvatarSuccess>
            <Box>
              <Typography variant="h3"> {Sum} €</Typography>
              <Typography variant="subtitle2" noWrap>
                A ce jour
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ChiffreAffaires;
