'use strict';

var defineComponent = require('flight/lib/component');

function userData() {
    this.attributes({});

    this.fetchUsers = function (e) {
        fetch(this.usersUri)
            .then(function (resp) {
                return resp.json();
            }.bind(this))

            .then(function (users) {
                console.debug(e.target);
                this.trigger(e.target, 'data:users', {users: users});
            }.bind(this))

            .catch(function (err) {
                this.trigger(e.target, 'data:error:notFound', {error: err});
            }.bind(this));
    };

    this.after('initialize', function () {
        this.usersUri = 'http://192.168.10.73.xip.io:3004/api/users.json';
        this.on('ui:users', this.fetchUsers);
    });
}

module.exports = defineComponent(userData);
