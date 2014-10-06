'use strict';

require('normalize-css');
require('font-awesome-webpack');
require('main.scss');

require('favicon.ico');

var ClickCounterUI = require('component/ui/click-counter');
ClickCounterUI.attachTo('#click-counter');

