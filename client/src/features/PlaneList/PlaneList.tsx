import { Container, Grid, CircularProgress, Alert, AlertTitle, Pagination } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSearchQuery } from '../NavBar/searchSlice';
import PlaneCard from './PlaneCard/PlaneCard';
import { fetchPlanes, selectPlanes } from './planeListSlice';

const PLANES_PER_PAGE = 9;

export function PlaneList() {
  const dispatch = useAppDispatch()
  const planes = useAppSelector(selectPlanes)
  const search = useAppSelector(selectSearchQuery);

  const [page, setPage] = useState(1);
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(fetchPlanes({ skip: (value-1) * PLANES_PER_PAGE, take: PLANES_PER_PAGE, search }))
    setPage(value);
  };

  const planesFetchStatus = useAppSelector(state => state.planeList.status)

  useEffect(() => {
    if (planesFetchStatus === 'idle') {
      dispatch(fetchPlanes({ skip: (page-1) * PLANES_PER_PAGE, take: PLANES_PER_PAGE }))
    }
  }, [planesFetchStatus, dispatch, page])


  let planeCards = planes.results.map((plane) => (
    <Grid key={plane.id} item xs={12} sm={6} md={4} lg={4}>
      <PlaneCard {...plane} />
    </Grid>
  ))

  const renderSwitch = () => {
    switch(planesFetchStatus) {
      case 'idle': case 'loading': {
        return (
          <CircularProgress />
        )
      }
      case 'succeeded': {
        return (
          <>
          <Grid container spacing={2}>
            {planeCards}
          </Grid>
          {Math.ceil(planes.status.total / PLANES_PER_PAGE) > 1 && (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: '20px'}}>
              <Pagination page={page} onChange={handlePageChange} size="large" count={Math.ceil(planes.status.total / PLANES_PER_PAGE)} />
            </Container>
          )}
          </>
        )
      }
      case 'failed': {
        return (
          <Alert severity="error">
            <AlertTitle sx={{ display: 'flex', justifyContent: 'left'}}>Error</AlertTitle>
            We have some technical problems. Try to refresh the page.
          </Alert>
        )
      }
    }
  }

  return (
    <Container maxWidth="lg" sx={{padding: '70px'}}>
        {renderSwitch()}
    </Container>
  );
}