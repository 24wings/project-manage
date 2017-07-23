import mongoose = require('mongoose');
import { CONFIG } from '../services/config';
import { project } from './Project';
import { employee } from './Employee';
import { job } from './Job';

mongoose.connect(CONFIG.mongodb || 'mongodb://localhost:27017/test');


export var db = { project, employee, job }