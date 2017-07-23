"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var projectSchema = new mongoose.Schema({
    name: { type: String, default: '项目的默认名称' },
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    createDt: { type: Date, default: Date.now }
});
exports.project = mongoose.model('Project', projectSchema);
