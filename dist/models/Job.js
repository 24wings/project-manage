"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let jobSchema = new mongoose.Schema({
    name: String,
    summary: String,
    createDt: { type: Date, default: Date.now }
});
exports.job = mongoose.model('Job', jobSchema);
