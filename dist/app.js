"use strict";
const express = require("express");
const path = require("path");
var favicon = require('serve-favicon');
const nunjucks = require("nunjucks");
const route_1 = require("./route");
const middleware_1 = require("./middleware");
const moment = require("moment");
const middle_1 = require("./middle");
var app = express();
var njk = nunjucks.configure(path.resolve(__dirname, '../views'), {
    autoescape: true,
    express: app,
    noCache: true,
});
//
njk.addFilter('time', function (obj) {
    return moment(obj).format('YYYY-MM-DD');
});
njk.addFilter('json', function (obj) {
    return JSON.stringify(obj);
});
njk.addFilter('money', function (money) {
    return money.toFixed(2);
});
njk.addFilter('boolean', function (ok) {
    return !!ok;
});
njk.addFilter('myFault', function (ok) {
    return !ok;
});
// app.set('trust proxy', 1) // trust first proxy 
app.use(middleware_1.Middleware.MiddlewareBuilder.buildMiddleware(middle_1.CommonMiddle))
    .use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')))
    .set('view engine', 'html')
    .all('/', (req, res) => res.redirect('/pm/index'))
    .use('/pm/:action', route_1.Route.RouteBuilder.buildRoute(middle_1.ProjectUserRoute))
    .use('/api/:action', route_1.Route.RouteBuilder.buildRoute(middle_1.ApiRoute))
    .use('/pm-admin/:action', route_1.Route.RouteBuilder.buildRoute(middle_1.ProjectManageAdminRoute))
    .use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
