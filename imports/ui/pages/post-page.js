import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../api/post/collections.js';

import '../components/post/post-item.js';

import './post-page.html';

Template.postPage.helpers({
  post() {
    return Posts.findOne(FlowRouter.getParam('_id'));
  },
});
