import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalPatients from './TotalPatients';
import TotalAdmissions from './TotalAdmissions';
import AverageStay from './AverageStay';
import TotalUniqueDiagnoses from './TotalUniqueDiagnoses';
import FirstMostCommonDiagnosis from './FirstMostCommonDiagnosis';
import SecondMostCommonDiagnosis from './SecondMostCommonDiagnosis';
import TotalPrescriptions from './TotalPrescriptions';
import TotalUniquePrescriptions from './TotalUniquePrescriptions';
import FirstMostCommonPrescription from './FirstMostCommonPrescription';
import SecondMostCommonPrescription from './SecondMostCommonPrescription';
import DiagnosesBarChart from './DiagnosesBarChart';

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
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalAdmissions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageStay />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUniqueDiagnoses />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FirstMostCommonDiagnosis />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <SecondMostCommonDiagnosis />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPrescriptions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUniquePrescriptions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FirstMostCommonPrescription />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <SecondMostCommonPrescription />
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
            lg={30}
            sm={30}
            xl={30}
            xs={30}

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