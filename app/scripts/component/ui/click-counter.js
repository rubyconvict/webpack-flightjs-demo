'use strict';

var defineComponent = require('flight/lib/component');
var template = require('default-click-counter.hgn');

function clickCounter() {
  this.attributes({
    clickableSelector: 'button',
    noteSelector: '.note span',
    templateName: 'default-click-counter'
  });

  this.onClick = function (e) {
    this.counter++;

    this.button.innerHTML = this.counter;// + '&nbsp;' + (this.counter > 1 ? msg.plural : msg.single);
    this.note.innerHTML = new Date(e.timeStamp);
    this.trigger('uiClickedMore');
  };

  this.render = function () {
    console.log('rendered');
    var context = {label: 0, now: 'Never fired!'};
    this.node.innerHTML = template(context);
  };

  this.after('initialize', function () {
    this.counter = 0;
    this.render();

    this.button = this.select('clickableSelector')[0];
    this.note = this.select('noteSelector')[0];

    this.on('click', {clickableSelector: this.onClick});
  });
}

module.exports = defineComponent(clickCounter);