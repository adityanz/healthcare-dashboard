import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Cards from './Cards.js';
import { cardData } from './TeamCards.js';

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

const AboutUs = ({className, ...rest}) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="about"
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
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            {"\n"}
            About Us!
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
          {"\n"}
          A journey towards creating a Healthcare Data story through data visualizations
          using React and D3.js. Our final product will be a dashboard that shows the
          relationship between diagnoses and demographics.
          </Typography>
        </Container>
      </Box>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Typography component="h4" variant="h2" align="center" style={{whiteSpace: 'pre-line'}} color="textMain" gutterBottom>
          {"\n"}
          {"\n"}
          Get To Know Our Team
        </Typography>
        <Cards cards={cardData} />
        {/*<Cards /> */}
      </Container>
    </Page>
  );
};

AboutUs.propTypes = {
  className: PropTypes.string
};

export default AboutUs;
