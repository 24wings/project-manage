import { Route } from '../route';

@Route.Views('pm')
export class ProjectUserRoute extends Route.BaseRoute implements Route.IRoute {
    doAction(action: string, method: string, next) {
        return this.index;
    }
    before() {
        this.next();
    }
    after() {
        console.log('test')
    }

    constructor() {
        super();
    }


    index() {
        this.render('index');
        this.next();
    }
}