webpack-flightjs-demo
=====================

The goal of this showcase project is to demonstrate how <a href="http://webpack.github.io/">webpack</a> module bundler can be used for building and loading a <a href="http://flightjs.github.io/">FlightJS</a> application as an alternative to the default RequireJS module loader.

Run
---

`webpack-dev-server -d --optimize-dedupe --progress --colors --display-error-details --hot`
<br/>
<br/>
`rm -rf ./dist && webpack -p --optimize-dedupe --progress --colors --display-error-details`

TODO
----
 - i18n
 - add a test / webpack + karma
