import React from 'react';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import EventInfo from './EventInfo';
import {Support} from '../compositions';
import Typography from './MyTypography';
import Link from '../next/MyLink'

import Wrapper from './Wrapper';

const styles = theme => ({
  container: {
    borderTop: '1px solid #cccccc'
  },

  paper: {
    padding: 30
  }
});

const Footer = ({ links, classes, width }) => (
  <div className={classes.container}>
    <Wrapper dense={true} color="#fafafa" >
      <Grid container spacing={8} wrap="wrap" justify="space-around" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <Support />
        </Grid>

        <Grid item xs={12} sm={6} md={5} lg={3} xl={3}>
          <EventInfo
            items={[
              {
                icon: 'location',
                secondary: 'event.location',
                primary: 'EXPO XXI, Prądzyńskiego 12/14'
              },

              {
                icon: 'date',
                secondary: 'event.date',
                primary: '23 października 2020'
              },

              {
                icon: 'alarm',
                secondary: 'event.hours',
                primary: '10:00-17:00'
              }
            ]}
            orientation="v"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Typography />

          <EventInfo
            items={[
              {
                secondary: 'event.organizer.name',
                primary: 'Infoguru Sp. z o.o. Sp. k.'
              },

              {
                secondary: 'event.organizer.address',
                primary: 'POLAND, Poznań, Truskawiecka 13'
              },

              {
                secondary: 'event.organizer.registration',
                primary: 'VAT ID 7811967834'
              }
            ]}
            orientation="v"
          />
        </Grid>
      </Grid>


         <div style={{marginTop: 30, marginBottom : 30}}>
            <Grid container spacing={8} wrap="wrap" justify="space-around" alignItems="center">
            {links.map(({label, href}) => (<Grid item key={label}><Link prefetch={false} href={href} label={label} /></Grid>))}        
            </Grid>
        </div>


    </Wrapper>
  </div>
);

Footer.defaultProps = {
  links: [{label: "exhibitors.agreement.title", href : '/legal'}]
};

const enhance = compose(withStyles(styles));

export default enhance(Footer);
