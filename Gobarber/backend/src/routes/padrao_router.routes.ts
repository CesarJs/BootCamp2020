import { Router } from 'express';

const nameRouter = Router();

nameRouter.post('/', async (request, response) => {
  return response.send();
});

export default nameRouter;
