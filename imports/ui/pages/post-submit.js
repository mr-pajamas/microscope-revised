import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { validatePost } from '../../api/post/collections.js';
import { insertPost } from '../../api/post/methods.js';
import { throwError } from '../../modules/client/errors.js';

import './post-submit.html';

/*
function validatePost(post) {
  const errors = {};
  if (!post.title) errors.title = 'Please fill in a headline';
  if (!post.url) errors.url = 'Please fill in a URL';
  return errors;
}
*/

Template.postSubmit.onCreated(function () {
  const templateInstance = this;
  templateInstance.errors = new ReactiveVar({});
});

Template.postSubmit.helpers({
  errorMessage(field) {
    return Template.instance().errors.get()[field];
  },
  errorClass(field) {
    return Template.instance().errors.get()[field] ? 'has-error' : '';
  },
});

Template.postSubmit.events({
  'submit form'(event, templateInstance) {
    event.preventDefault();

    const post = {
      title: $(event.target).find('[name=title]').val().trim(),
      url: $(event.target).find('[name=url]').val().trim(),
    };

    const errors = validatePost(post);
    templateInstance.errors.set(errors);

    if (_.isEmpty(errors)) {
      insertPost.call(post, (error, { postExists = false, _id } = {}) => {
        if (error) {
          throwError(error.reason);
        } else {
          if (postExists) { throwError('This link has already been posted'); }

          FlowRouter.go('postPage', { _id });
        }
      });
    }
  },
});
