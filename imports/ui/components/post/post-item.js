import { Template } from 'meteor/templating';

import './post-item.html';

Template.postItem.helpers({
  domain() {
    const a = document.createElement('a');
    ({ url: a.href } = this);
    return a.hostname;
  }
});
