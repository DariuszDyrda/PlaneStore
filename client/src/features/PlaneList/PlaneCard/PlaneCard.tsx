import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface IPlaneProps {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  createdAt: string,
  updatedAt: string,
  price: number;
}

export default function PlaneCard(plane: IPlaneProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={plane.name}
        subheader={plane.price.toLocaleString(undefined, { maximumFractionDigits: 2}) + " USD"}
      />
      <CardMedia
        component="img"
        height="194"
        // TODO - show photo placeholder when image can't be loaded
        image={plane.photoUrl}
        alt={plane.name}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
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