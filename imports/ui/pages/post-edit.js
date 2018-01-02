import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../api/post/collections.js';

import './post-edit.html';

Template.postEdit.events({
  'submit form'(event) {
    event.preventDefault();

    const currentPostId = this._id;

    const postProperties = {
      url: $(event.target).find('[name=url]').val().trim(),
      title: $(event.target).find('[name=title]').val().trim(),
    };

    Posts.update(currentPostId, { $set: postProperties }, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        FlowRouter.go('postPage', { _id: currentPostId });
      }
    });
  },
  'click .delete'(event) {
    event.preventDefault();

    if (confirm('Delete this post?')) {
      Posts.remove(this._id);
      FlowRouter.go('postsList');
    }
  },
});
