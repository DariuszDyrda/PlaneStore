import { Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PlaneCard from './PlaneCard/PlaneCard';
import { fetchPlanes, selectPlanes } from './planeListSlice';

export function PlaneList() {
  const dispatch = useAppDispatch()
  const planes = useAppSelector(selectPlanes)

  const planesFetchStatus = useAppSelector(state => state.planeList.status)

  useEffect(() => {
    if (planesFetchStatus === 'idle') {
      dispatch(fetchPlanes())
    }
  }, [planesFetchStatus, dispatch])


  let planeCards = planes.map((plane) => (
    <Grid key={plane.id} item xs={12} sm={6} md={4} lg={4}>
      <PlaneCard {...plane}/>
    </Grid>
  ))

  return (
    <Container maxWidth="lg" sx={{padding: '70px'}}>
      <Typography>State: {planesFetchStatus}</Typography>
        <Grid container spacing={2}>
            {planeCards}
        </Grid>
    </Container>
  );
}