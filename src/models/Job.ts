import mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
    name: String,
    summary: String,
    createDt: { type: Date, default: Date.now }
});

export var job = mongoose.model('Job', jobSchema);

