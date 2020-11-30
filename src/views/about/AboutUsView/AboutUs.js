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
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Typography component="h4" variant="h2" align="center" style={{whiteSpace: 'pre-line'}} color="textMain" gutterBottom>
          {"\n"}
          Get To Know Our Team
        </Typography>
        <Cards cards={cardData} />
        {/*<Cards /> */}
      </Container>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        justifyContent="left"
      >
        <Container maxWidth="md">
          <Typography
            align="left"
            color="textPrimary"
            variant="h1"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            {"\n"}
            About Us!
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
          A journey towards creating a Healthcare Data story through data visualizations
          using React and D3.js. Our final product will be a dashboard that shows the
          relationship between different diagnoses and demographics.
          </Typography>
        </Container>
        <Container maxWidth="md">
          <Typography
            align="left"
            color="textPrimary"
            variant="h1"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            How It All Began...
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
          At the University of San Francisco, Senior standing students have the opportunity to work as a team with a
          sponsor as an introduction to what a tech job is like after graduation. All teams meet with their respective
          sponors over the course of the semester to work on a project that the sponsor has designed. It is up to each
          team how meetings, check-ins, follow-ups, and deliverables are handled. The goal is to have a finished product
          by the end of the semester, that each team member worked on under the guidance of our sponsors.
          </Typography>
        </Container>
        <Container maxWidth="md">
          <Typography
            align="left"
            color="textPrimary"
            variant="h1"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            The Building Blocks
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
            Before even beginnign to create this dashboard, Chia, Jochem and Aditya were tasked with completing three mini
            projects that would serve as the building blocks for our big project. Each project addressed the three main areas
            of our project: backend, frontend, and middleware. We each worked on all of these projects individually so that we
            all knew how to work with the technologies we would be using for every area of the project. This helped us to decide
            what parts of the project we would be the most responsible for, to understand how each component of the project works,
            to learn how to tie each component together, and to be able to help each other out when one of us got stuck.
          </Typography>
          <Typography
            align="left"
            color="textPrimary"
            variant="h3"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            Data Visualization - Mini Project
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
            Our first mini project involved creating three basic visualizations with the dataset of our choice to help us
            become familiar with using React and D3.js together. This small intro to creating simple data visualizations
            taught us how we would be telling our story, the different relationships between data that we could show,
            and how powerful React can be when used with D3.
          </Typography>
          <Typography
            align="left"
            color="textPrimary"
            variant="h3"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            Queries - Mini Project
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
            Our second mini project involved writing some queries to familiarize ourselves with the data we would be working
            with through a local Jupyter Notebook connected to the local database hosted on PostgreSQL. This mini project
            sharpened our SQL skills and helped us dive deeper into the data so we could navigate it more easily in the future.
            With the help of SQLAlchemy, Pandas and raw SQL, we were able to write queries that answered some questions our
            Sponsor Tim gave us to help us dive deeper into the data and start to see different relationships among the dataset.
          </Typography>
          <Typography
            align="left"
            color="textPrimary"
            variant="h3"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            API - Mini Project
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
            Our third and final mini project allowed us to create a local API layer using Python, FastAPI, and Postman, to
            generate a REST API to interface with. Our API is set up to return its results formatted in JSON. This was later
            connected to Google BigQuery.
          </Typography>
          <Typography
            align="left"
            color="textPrimary"
            variant="h1"
            style={{whiteSpace: 'pre-line'}}
          >
            {"\n"}
            The Final Product
          </Typography>
          <Typography
            align="left"
            color="textSecondary"
            variant="h4"
            style={{whiteSpace: 'pre-line'}}
          >
            In order to start building our final product, we first came up with questions we could answer through different
            interactive visualizations. Then, we connected our API to Google BigQuery, and as a result we were able to query
            the data to give us what we needed. We then used React and D3.js to create a visualization for each of the questions
            we had and included some fun facts about the dataset we worked with at the top. Our final project allows hospital
            administrators, clinical researchers, data enthusiasts, and others to look at different relationships between the data
            in a simple and effective way. This means no one that uses our dashboard need any technical backgroud to be able to
            see and find relationships. That said, our code is on GitHub and is available to anyone intrested in seeing our
            progress and final product.
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

AboutUs.propTypes = {
  className: PropTypes.string
};

export default AboutUs;
