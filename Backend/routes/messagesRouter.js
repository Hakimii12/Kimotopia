import express from 'express';
import { CreateMessage, GetConversations, GetMessage } from '../controllers/MessageController.js';
import Authorization from '../middlewares/Authorization.js';
const routes=express.Router();
routes.get('/conversations',Authorization, GetConversations);
routes.get('/:otherId',Authorization, GetMessage)
routes.post('/',Authorization, CreateMessage);
export default routes;