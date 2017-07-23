"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
const Projecct_1 = require("./Projecct");
mongoose.connect(config_1.CONFIG.mongodb || 'mongodb://localhost:27017/test');
exports.db = { project: Projecct_1.project };
