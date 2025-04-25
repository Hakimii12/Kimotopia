import express from 'express';
import { CreateMessage } from '../controllers/MessageController.js';
const routes=express.Router();
routes.post('/', CreateMessage);
export default routes;