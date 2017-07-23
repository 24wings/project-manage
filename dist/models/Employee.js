"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    truename: { type: String, required: true },
    createDt: { type: Date, default: Date.now },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    summary: { type: String, default: '默认的个人简介' },
    //　是否在岗
    onJob: { type: Boolean, default: true }
});
exports.employee = mongoose.model('Employee', exports.employeeSchema);
