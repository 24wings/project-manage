import express = require('express');
import service = require('./services');
export type Request = express.Request;
export type Response = express.Response;
export type RequestHandler = express.RequestHandler;


export namespace Route {
    export type Request = express.Request;
    export type Response = express.Response;
    export type RequestHandler = express.RequestHandler;

    export interface IRoute {

        doAction: (action: string, method: string, next: RequestHandler) => RequestHandler;
    }


    export class BaseRoute {
        GET = 'get';
        POST = 'post';
        DELETE = 'delete';
        PUT = 'put';
        public service = service;

        constructor() {

        }

    }


    export class RouteBuilder {
        /** 
         * 
         * 构建路由
         */
        static buildRoute(routeClass: new () => IRoute): RequestHandler {
            var route = new routeClass();

            return (req: Request, res: Response, next: RequestHandler) => {


                route.doAction(req.params.action, req.method.toLowerCase(), next).bind(route)(req, res, next);
            }
        }
        static buildMiddle(): RequestHandler[] {
            return

        }

    }
}



