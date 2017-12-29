import { Template } from 'meteor/templating';

import './post-item.js';
import './post-list.html';

const postData = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
  },
  {
    title: 'Meteor',
    url: 'http://meteor.com',
  },
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
  },
];

Template.postList.helpers({
  posts() {
    return postData;
  },
});
