import express from 'express';
import { CreateMessage, GetMessage } from '../controllers/MessageController.js';
import Authorization from '../middlewares/Authorization.js';
const routes=express.Router();
routes.post('/',Authorization, CreateMessage);
routes.get('/:otherId',Authorization, GetMessage);
export default routes;