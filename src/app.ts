import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import bodyParser = require('body-parser');
import middle = require('./middle');
import nunjucks = require('nunjucks');
import service = require('./services');
import { Route } from './route';
import { Middleware } from './middleware';
import moment = require('moment');
import { CommonMiddle, ProjectManageAdminRoute, ApiRoute, ProjectUserRoute } from './middle';


var app = express();
var njk = nunjucks.configure(path.resolve(__dirname, '../views'), { // 设置模板文件的目录，为views
    autoescape: true,
    express: app,
    noCache: true,
})
//
njk.addFilter('time', function (obj: Date) {
    return moment(obj).format('YYYY-MM-DD');
})
njk.addFilter('json', function (obj) {
    return JSON.stringify(obj)
})
njk.addFilter('money', function (money: number) {
    return money.toFixed(2);
})
njk.addFilter('boolean', function (ok) {
    return !!ok;
});
njk.addFilter('myFault', function (ok: boolean) {
    return !ok;

})

// app.set('trust proxy', 1) // trust first proxy 

app.use(Middleware.MiddlewareBuilder.buildMiddleware(CommonMiddle))
    .use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')))
    .set('view engine', 'html')
    .all('/', (req, res) => res.redirect('/pm/index'))
    .use('/pm/:action', Route.RouteBuilder.buildRoute(ProjectUserRoute))
    .use('/api/:action', Route.RouteBuilder.buildRoute(ApiRoute))
    .use('/pm-admin/:action', Route.RouteBuilder.buildRoute(ProjectManageAdminRoute))
    // 错误处理
    .use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        console.log(err);
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
export =app;  