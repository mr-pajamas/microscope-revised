import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { insertPost } from '../../api/post/methods.js';

import './post-submit.html';

Template.postSubmit.events({
  'submit form'(event) {
    event.preventDefault();

    const post = {
      title: $(event.target).find('[name=title]').val().trim(),
      url: $(event.target).find('[name=url]').val().trim(),
    };

    insertPost.call(post, (error, { _id }) => {
      if (error) {
        alert(error.reason);
      } else {
        FlowRouter.go('postPage', { _id });
      }
    });
  },
});
