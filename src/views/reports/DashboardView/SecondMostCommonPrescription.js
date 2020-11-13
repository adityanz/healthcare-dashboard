import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const SecondMostCommonPrescription = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              SECOND MOST COMMON PRESCRIPTION
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              INSULINE
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SecondMostCommonPrescription.propTypes = {
  className: PropTypes.string
};

export default SecondMostCommonPrescription;
