import express from 'express';
import { CreateMessage } from '../controllers/MessageController.js';
import Authorization from '../middlewares/Authorization.js';
const routes=express.Router();
routes.post('/',Authorization, CreateMessage);
export default routes;