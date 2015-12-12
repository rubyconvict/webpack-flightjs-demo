'use strict';

if (__DEV__) {
  console.warn('Extra logging');
}

require('font-awesome-webpack');
require('main.scss');

var ClickCounterUI = require('component/ui/click-counter');
ClickCounterUI.attachTo('#click-counter');
