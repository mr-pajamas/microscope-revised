import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../components/loading.html';
import '../pages/not-found.js';
import '../pages/access-denied.js';

import './header.html';
import './layout.html';

Template.layout.helpers({
  requireLogin() {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.options.requireLogin;
  },
});

Template.layoutContent.helpers({
  hasData() {
    FlowRouter.watchPathChange();
    return !!FlowRouter.current().route.options.data;
  },
  data() {
    FlowRouter.watchPathChange();
    const dataFunc = FlowRouter.current().route.options.data;
    if (dataFunc) return dataFunc();
    return undefined;
  },
});
