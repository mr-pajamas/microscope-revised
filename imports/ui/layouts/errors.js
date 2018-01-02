import { Template } from 'meteor/templating';

import { Errors } from '../../modules/client/errors.js';

import './errors.html';

Template.errors.helpers({
  errors() {
    return Errors.find();
  },
});
