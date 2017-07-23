import mongoose = require('mongoose');



var projectSchema = new mongoose.Schema({
    name: { type: String, default: '项目的默认名称' },
    summary: { type: String, default: '默认描述' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    createDt: { type: Date, default: Date.now },
});


export var project = mongoose.model('Project', projectSchema);
