import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalPatients from './TotalPatients';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import DiagnosesBarChart from './DiagnosesBarChart';
import TotalDiagnoses from './TotalDiagnoses';
import TotalAdmissions from './TotalAdmissions';
import MostCommon from './MostCommon';
import LeastCommon from './LeastCommon';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
           <TotalPatients />
          </Grid>
          <Grid
            item
            lg={2}
            sm={3}
            xl={1}
            xs={15}
          >
           <TotalAdmissions />
          </Grid>
          <Grid
            item
            lg={2}
            sm={3}
            xl={1}
            xs={15}
          >
           <TotalDiagnoses />
          </Grid>
          <Grid
            item
            lg={2}
            sm={3}
            xl={1}
            xs={15}
          >
           <MostCommon />
          </Grid>
          <Grid
            item
            lg={2}
            sm={3}
            xl={1}
            xs={15}
          >
           <LeastCommon />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <DiagnosesBarChart />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          > */}
            {/* <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
