/* eslint-disable import/prefer-default-export */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
  },
  author: {
    type: String,
    optional: true,
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
}));

Posts.allow({
  insert(userId) {
    return !!userId;
  },
});

export { Posts };
