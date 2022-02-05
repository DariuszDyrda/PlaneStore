import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const plane = {
  id: 1,
  name: 'Airbus A380',
  description: "This is a very gigantic aeroplane. It's the biggest passenger plane on the planet.",
  photoUrl: "https://ocdn.eu/pulscms-transforms/1/lpJktkqTURBXy9jMjIyOGM2NzJkZTkwM2RmNDk0MDU2MWMzNjgzMTBhZS5qcGVnkpUDAADNAyDNAcKTBc0EsM0Cdg",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function PlaneCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={plane.name}
        subheader={plane.createdAt.toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={plane.photoUrl}
        alt={plane.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {plane.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button variant="outlined">Learn more</Button>
        <Button variant="contained">Buy now!</Button>
      </CardActions>
    </Card>
  );
}