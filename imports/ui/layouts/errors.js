import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Errors } from '../../modules/client/errors.js';

import './errors.html';

Template.errors.helpers({
  errors() {
    return Errors.find();
  },
});

Template.error.onRendered(function () {
  const error = this.data;
  Meteor.setTimeout(() => { Errors.remove(error._id); }, 3000);
});
