import { Container, Grid } from '@mui/material';
import PlaneCard from './PlaneCard/PlaneCard';

const plane = {
  id: 1,
  name: 'Airbus A380',
  description: "This is a very gigantic aeroplane. It's the biggest passenger plane on the planet.",
  // TODO - show photo placeholder when can't load image
  photoUrl: "https://ocdn.eu/pulscms-transforms/1/lpJktkqTURBXy9jMjIyOGM2NzJkZTkwM2RmNDk0MDU2MWMzNjgzMTBhZS5qcGVnkpUDAADNAyDNAcKTBc0EsM0Cdg",
  createdAt: new Date(),
  updatedAt: new Date(),
  price: 30000000
}

export function PlaneList() {
  let planeCards = [];
  for (let i = 0; i < 6; i++) {
    planeCards.push(
        <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
            <PlaneCard {...plane}/>
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