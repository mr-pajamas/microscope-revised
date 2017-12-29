import { Meteor } from 'meteor/meteor';

import { Posts } from '../collections.js';

Meteor.publish('post.posts', function () {
  return Posts.find();
});
