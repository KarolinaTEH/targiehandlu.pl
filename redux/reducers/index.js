//we use persistCombineReducers instead
//import { combineReducers } from 'redux'

import dialog from './dialog';
import boothsSelected from './booths';
import resources from './resources';
import meta from './meta';
import snackbar from './snackbar';
import drawer from './drawer';
import app from './app';
import visuals from './visuals';
import services from './services';
import transactions from './transactions';

export default {
  app,
  transactions,
  visuals,
  dialog,
  snackbar,
  services,
  boothsSelected,
  resources,
  meta,
  drawer
};
