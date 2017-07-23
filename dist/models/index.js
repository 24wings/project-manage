"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../services/config");
const Project_1 = require("./Project");
const Employee_1 = require("./Employee");
const Job_1 = require("./Job");
mongoose.connect(config_1.CONFIG.mongodb || 'mongodb://localhost:27017/test');
exports.db = { project: Project_1.project, employee: Employee_1.employee, job: Job_1.job };
