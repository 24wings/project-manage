"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
class ShareAdminRoute extends route_1.Route.BaseRoute {
    constructor() {
        super(...arguments);
        // do 的常见几种操作
        this.LIST = 'list';
        this.VIEWDIR = 'share-admin';
    }
    doAction(action, method, next) {
        switch (action) {
            case 'task-list':
                return this.taskList;
            case 'task-detail':
                return this.taskDetail;
            case 'task-delete':
                return this.taskDelete;
            case 'taskTag-list':
                return this.taskTagList;
            case 'taskTag-detail':
                return this.taskTagDetail;
            case 'taskTag-new':
                return this.GET == method ? this.taskTagNewPage : this.taskTagNewPageDo;
            case "taskTag-delete":
                return this.taskTagDelete;
            case 'taskRecord-list':
                return this.taskRecordList;
            case 'taskRecord-detail':
                return this.taskRecordDetail;
            case 'order-detail':
                return this.taskRecordDetail;
            default:
                return this.index;
        }
    }
    index(req, res) {
        res.render(`${this.VIEWDIR}/index`);
    }
    async taskTagDelete(req, res) {
        let action = await this.service.db.taskTagModel.findByIdAndRemove(req.query._id).exec();
        res.redirect(`/${this.VIEWDIR}/taskTag-list`);
    }
    async taskDelete(req, res) {
        var _id = req.query._id;
        let action = await this.service.db.taskModel.findByIdAndRemove(_id).exec();
        res.redirect(`/${this.VIEWDIR}/task-list`);
    }
    async taskList(req, res) {
        var tasks = await this.service.db.taskModel.find().populate('publisher  taskTag').exec();
        res.render(`${this.VIEWDIR}/task-list`, { tasks });
    }
    async taskRecordList(req, res) {
        var taskRecords = await this.service.db.taskRecordModel.find().populate('task').exec();
        res.render(`${this.VIEWDIR}/taskRecord-list`, { taskRecords });
    }
    async taskRecordDetail(req, res) {
        var _id = req.query._id;
        var taskRecord = await this.service.db.taskRecordModel.findById(_id).exec();
        var orders = [];
        for (var detail of taskRecord.shareDetail) {
            let user = await this.service.db.userModel.findById(detail.user).exec();
            orders.push({ user: user, money: detail.money });
        }
        res.render(`${this.VIEWDIR}/taskRecord-detail`, { taskRecord, orders });
    }
    async taskDetail(req, res) {
        var task = await this.service.db.taskModel.findById(req.query._id).populate('publisher taskTag').exec();
        res.render(`${this.VIEWDIR}/task-detail`, { task });
    }
    async taskTagList(req, res) {
        var taskTags = await this.service.db.taskTagModel.find().exec();
        res.render(`${this.VIEWDIR}/taskTag-list`, { taskTags });
    }
    async taskTagDetail(req, res) {
        var taskTag = await this.service.db.taskTagModel.findById(req.query._id).exec();
        res.render(`${this.VIEWDIR}/taskTag-detail`, { taskTag });
    }
    async taskTagNewPage(req, res) {
        res.render(`${this.VIEWDIR}/taskTag-new`);
    }
    async taskTagNewPageDo(req, res) {
        let { name } = req.body;
        let newTaskTag = await new this.service.db.taskTagModel({ name }).save();
        res.redirect('/share-admin/taskTag-list');
    }
}
exports.ShareAdminRoute = ShareAdminRoute;
