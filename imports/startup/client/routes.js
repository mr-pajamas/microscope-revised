import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/layout.js';

BlazeLayout.setRoot('body');

FlowRouter.subscriptions = function() {
  this.register('posts', Meteor.subscribe('post.posts'));
};

FlowRouter.route('/', {
  name: 'postList',
  async action() {
    await import('../../ui/pages/post-list.js');
    BlazeLayout.render('layout', { mainContent: 'postList' });
  },
});

FlowRouter.route('/posts/:_id', {
  name: 'postPage',
  async action() {
    await import('../../ui/pages/post-page.js');
    BlazeLayout.render('layout', { mainContent: 'postPage' });
  },
});
