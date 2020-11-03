import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import AboutUs from './AboutUs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const About = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="About Us"
    >
      <Container maxWidth={false}>
      <AboutUs />
      </Container>
    </Page>
  );
};

export default About;
