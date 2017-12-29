import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Posts } from '../../api/post/collections.js';

import './access-denied.js';

import './post-submit.html';

Template.postSubmit.onCreated(function () {
  const templateInstance = this;
  templateInstance.autorun(() => {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      Meteor.defer(() => BlazeLayout.render('accessDenied'));
    }
  });
});

Template.postSubmit.events({
  'submit form'(event) {
    event.preventDefault();

    const post = {
      title: $(event.target).find('[name=title]').val().trim(),
      url: $(event.target).find('[name=url]').val().trim(),
    };

    Posts.insert(post, (error, _id) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go('postPage', { _id });
      }
    });
  },
});
