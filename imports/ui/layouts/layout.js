import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../components/loading.html';

import '../pages/access-denied.js';

import './header.html';
import './layout.html';

Template.layout.helpers({
  requireLogin() {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.options.requireLogin;
  },
});
