'use strict';

if (__DEV__) {
  console.warn('Extra logging');
  console.warn(__("Hello World"));
}

//require('font-awesome-webpack');
require('main.scss');

require('component/data/users').attachTo(document);
require('component/ui/users-list').attachTo("#users");

var ClickCounterUI = require('component/ui/click-counter');
ClickCounterUI.attachTo('#click-counter');
