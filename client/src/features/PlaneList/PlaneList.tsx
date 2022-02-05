import { Container, Grid } from '@mui/material';
import PlaneCard from './PlaneCard/PlaneCard';

export function PlaneList() {
  let planeCards = [];
  for (let i = 0; i < 6; i++) {
    planeCards.push(
        <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
            <PlaneCard/>
        </Grid>
    )
  }

  return (
    <Container maxWidth="lg" sx={{padding: '70px'}}>
        <Grid container spacing={2}>
            {planeCards}
        </Grid>
    </Container>
  );
}