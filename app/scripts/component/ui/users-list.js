'use strict';

var defineComponent = require('flight/lib/component');
var usersTmpl = require('users.hgn');
var userTmpl = require('user.hgn');

// Displays a list of users as list of the user info cards
function usersList() {
    this.attributes({
        listContainerSelector: 'ul'
    });

    this.render = function (e, data) {
        var context = {users: data.users},
            partial = {user: userTmpl};
        this.node.innerHTML = usersTmpl.render(context, partial);
    };

    this.renderError = function (e, data) {
        var context = {error: data.error};
        this.node.innerHTML = usersTmpl.render(context);
        this.select('listContainerSelector').attr('no-data', '');
    };

    this.after('initialize', function () {
        this.on('data:users', this.render);
        this.on('data:error:notFound', this.renderError);
        // ask for the content: users data
        this.trigger('ui:users');
    });
}

module.exports = defineComponent(usersList);
