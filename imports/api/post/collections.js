/* eslint-disable import/prefer-default-export */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

import { ownsDocument } from '../../modules/permissions.js';

const Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    index: true,
    unique: true,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  author: {
    type: String,
    optional: true,
  },
  submitted: {
    type: Date,
    autoValue() { // eslint-disable-line consistent-return
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else { // eslint-disable-line no-else-return
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
}));

/*
Posts.allow({
  insert(userId) {
    return !!userId;
  },
});
*/
Posts.allow({
  update: ownsDocument,
  remove: ownsDocument,
});

Posts.deny({
  update(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  },
});

export { Posts };
