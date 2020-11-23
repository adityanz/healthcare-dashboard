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
import TotalUniquePrescriptions from './TotalUniquePrescriptions';
import FirstMostCommonPrescription from './FirstMostCommonPrescription';
import DiagnosesBarChart from './DiagnosesBarChart';
import DiagnosesBubbleChart from './DiagnosesBubbleChart';
import DiagnosesScatterPlot from './DiagnosesScatterPlot';
import DiagnosesParallelCoordinates from './DiagnosesParallelCoordinates';
import DiagnosesLineChart from './DiagnosesLineChart';

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
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
          >
            <DiagnosesBubbleChart />
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth={false}>

        <Grid
          container
          spacing={3}
          title="Diagnoses Distribution of Admitted Patients"
        >
          <Grid
            item
          >
            <DiagnosesBarChart />
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
          >
            <DiagnosesScatterPlot />
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
          >
            <DiagnosesParallelCoordinates/>
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
          >
            <DiagnosesLineChart />
          </Grid>
        </Grid>

      </Container>

    </Page>
  );
};

export default Dashboard;
