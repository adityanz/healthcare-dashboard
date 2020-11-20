import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="home"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            Welcome to our Healthcare Dashboard!
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            The visualizations on this website show some relationships we found interesting
            with the Medical Information Mart for Intensive Care III. MIMIC-III is a large,
            freely-available database comprising deidentified health-related data associated
            with over 40 thousand patients who stayed in critical care units of the Beth
            Israel Deaconess Medical Center between 2001 - 2012.
          </Typography>
          <Box textAlign="center">
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

HomeView.propTypes = {
  className: PropTypes.string
};

export default HomeView;
