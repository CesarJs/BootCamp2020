import { Router } from 'express';

const _name_Router = Router();

_name_Router.post('/', async (request, response) => {
  try {
    return response.send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default _name_Router;
