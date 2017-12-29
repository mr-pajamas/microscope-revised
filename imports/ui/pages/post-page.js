import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Posts } from '../../api/post/collections.js';

import './not-found.js';
import '../components/post/post-item.js';

import './post-page.html';

Template.postPage.onCreated(function () {
  const templateInstance = this;
  templateInstance.autorun(() => {
    if (FlowRouter.subsReady('posts') && !Posts.findOne(FlowRouter.getParam('_id'))) {
      Meteor.defer(() => BlazeLayout.render('notFound'));
    }
  });
});

Template.postPage.helpers({
  post() {
    return Posts.findOne(FlowRouter.getParam('_id'));
  },
});
