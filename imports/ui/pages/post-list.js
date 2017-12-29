import { Template } from 'meteor/templating';

import { Posts } from '../../api/post/collections.js';

import '../components/post/post-item.js';
import './post-list.html';

Template.postList.onCreated(function () {
  const templateInstance = this;
  templateInstance.subscribe('post.posts');
});

Template.postList.helpers({
  posts() {
    return Posts.find();
  },
});
