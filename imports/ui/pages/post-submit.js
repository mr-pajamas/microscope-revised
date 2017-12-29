import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../api/post/collections.js';

import './post-submit.html';

Template.postSubmit.events({
  'submit form'(event) {
    event.preventDefault();

    const post = {
      title: $(event.target).find('[name=title]').val(),
      url: $(event.target).find('[name=url]').val(),
    };

    post._id = Posts.insert(post);
    FlowRouter.go('postPage', post);
  },
});
