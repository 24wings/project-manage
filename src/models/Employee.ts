import mongoose = require('mongoose');

export var employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    truename: { type: String, required: true },
    createDt: { type: Date, default: Date.now },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    summary: { type: String, default: '默认的个人简介' },

    //　是否在岗
    onJob: { type: Boolean, default: true }
});

export interface IEmployee extends mongoose.Document {
    username: string;
    password: string;
    truename: string;
    createDt: Date;
    job: any;
    summary: string;
    onJob: boolean;
}

export var employee = mongoose.model<IEmployee>('Employee', employeeSchema);
