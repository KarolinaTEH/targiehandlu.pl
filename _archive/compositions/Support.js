import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import PlayArrowIcon from 'material-ui/icons/PlayArrow';

import compose from 'recompose/compose';
import { translate } from '../i18n';

import {MyCardSlim as Card} from '../components';

import Chatlio from '../services/Chatlio';

const styles = theme => ({
  container: {
    // maxWidth : 700
  },
  icon: {
    height: 38,
    width: 38
  },
  contactInfo : {
    fontWeight : 600
  }
});

const Support = ({
  classes,
  translate,
  title,
  text,
  name,
  avatar,
  phone,
  email
}) => (
  <div className={classes.container}>
    <Card
      primary={false}
      title={translate(title)}
      text={
        <div>
          <p>{translate(text, { person: name })}<br/>
          <span className={classes.contactInfo}>
          {email} {phone}  
          </span></p>
        </div>
      }
      imageSrc={avatar}
      link={<Chatlio />}
    />
  </div>
);

Support.defaultProps = {
  title: 'event.support.hello',
  text: 'event.support.description',
  name: 'Adam Zygadlewicz',
  avatar: '/static/support.jpg',
  phone: '+48 721 945 134',
  email: 'hello@targiehandlu.pl'
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(Support);
