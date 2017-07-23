import { Route } from '../route';


@Route.Views('pm-admin')
export class ProjectManageAdminRoute extends Route.BaseRoute implements Route.IRoute {
    doAction(action: string, method: string, next) {
        switch (action) {
            case 'index': return this.index;
            case 'login': return this.GET == method ? this.login : this.loginDo;
            case 'project-new': return this.GET == method ? this.projectNew : this.projectNewDo;
            case 'job-list': return this.jobList;
            case 'job-new': return this.GET == method ? this.jobNew : this.jobNewDo;
            case 'employee-list': return this.employeeList;
            case 'employee-new': return this.GET == method ? this.employeeNew : this.employeeNewDo;
            case 'project-list': return this.projectList;
            default: return this.index;
        }
    }

    async projectList() {
        let projects = await this.db.project.find().exec();
        this.render('project-list', { projects });
    }

    async employeeList() {
        let employees = await this.db.employee.find().exec();
        this.render('employee-list', { employees });
    }
    async employeeNew() {
        let jobs = await this.db.job.find().exec();
        this.render('employee-new', { jobs });
    }
    async employeeNewDo() {
        let { username, password, truename } = this.req.body;
        let newEmployee = await new this.db.employee({ username, password, truename }).save();
        this.res.redirect('/pm-admin/employee-list');
    }
    async jobNewDo() {
        let { name, summary } = this.req.body;
        let newJob = await new this.service.db.job({ name, summary }).save();
        this.res.redirect('/pm-admin/job-list');
    }
    jobNew() {
        this.render('job-new')
    }

    async jobList() {
        let jobs = await this.db.job.find().exec();
        this.render('job-list', { jobs });
    }

    async projectNew() {
        // 可选择的在岗工作人员
        let employees = await this.db.employee.find().exec();
        this.render('project-new', { employees });
    }

    async projectNewDo() {
        let { name, description, employees } = this.req.body;
        let newProject = await new this.service.db.project({ name, description, employees }).save();
        this.res.redirect('/pm-admin/project-list');
    }

    before() {
        console.log(this.req.baseUrl == '/pm-admin/login');
        if (this.req.session.admin || this.req.baseUrl == '/pm-admin/login') {
            this.next();
        } else {
            this.res.redirect('/pm-admin/login')
        }

    }

    after() { }
    constructor() {
        super();
    }
    login() { this.render('login'); }
    loginDo() {
        let { username, password } = this.req.body;
        if (username == 'admin' && password == '123') {
            this.req.session.admin = { username, password };
            this.res.redirect('/pm-admin/index');
        } else {
            this.render('login', { errorMsg: '用户名或密码不合法' });
        }
    }
    index() {
        this.render('index');
    }


}