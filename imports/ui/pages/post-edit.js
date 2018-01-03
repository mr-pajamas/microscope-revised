import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts, validatePost } from '../../api/post/collections.js';
import { throwError } from '../../modules/client/errors.js';

import './post-edit.html';

Template.postEdit.onCreated(function () {
  const templateInstance = this;
  templateInstance.errors = new ReactiveVar({});
});

Template.postEdit.helpers({
  errorMessage(field) {
    return Template.instance().errors.get()[field];
  },
  errorClass(field) {
    return Template.instance().errors.get()[field] ? 'has-error' : '';
  },
});

Template.postEdit.events({
  'submit form'(event, templateInstance) {
    event.preventDefault();

    const currentPostId = this._id;

    const postProperties = {
      url: $(event.target).find('[name=url]').val().trim(),
      title: $(event.target).find('[name=title]').val().trim(),
    };

    const errors = validatePost(postProperties);
    templateInstance.errors.set(errors);

    if (_.isEmpty(errors)) {
      Posts.update(currentPostId, { $set: postProperties }, (error) => {
        if (error) {
          throwError(error.reason);
        } else {
          FlowRouter.go('postPage', { _id: currentPostId });
        }
      });
    }
  },
  'click .delete'(event) {
    event.preventDefault();

    if (confirm('Delete this post?')) {
      Posts.remove(this._id);
      FlowRouter.go('postList');
    }
  },
});
