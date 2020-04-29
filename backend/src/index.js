const express = require('express');
const  { uuid } = require('uuidv4');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
/**
 * Métodos HTTP
 *
 * GET : Utilizado para buscar informações do back-end
 * POST: Utilizado para salvar informações no back-end
 * PUT / PATCH: Utilizado para editar informações no back-end
 * DELETE: Utilizado para deletar informações no back-end
 */

 /**
  * Tipos de parâmetros:
  * Query Parans: Filtros e paginação
  * Route Params: Identificar Objetos
  * Request Body: Vem atráves do corpo da requisição (JSON)
  */

  /**
   * Middleware:
   * Interceptador de requisiçãoes, pode interromper totalmente a requisição
   * ou alterar dados da requisição.
   */
const projects = [];
function logRequests(request, response, next){
	const { method, url } = request;

	const logLabel = `[${method.toUpperCase()}] ${url}`;

	console.log(logLabel);

	return next();
}

app.use(logRequests);

app.get('/repositories', (request, response) => {
	const { title } = request.query;
	const results = title
	? projects.filter(project => project.title.includes(title))
	: projects;

	return response.json(results);
});

app.post('/repositories', (request, response) => {
	const { title, owner, url, techs} = request.body;
	const project = { id: uuid(), title, owner, url, techs};
	projects.push(project);
	return response.json(project);
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs} = request.body;
	const projectIndex = projects.findIndex(project => project.id == id);
	if(projectIndex < 0){
		return response.status(400).json({ error: 'Project not found' });
	}
	const project = {
		id,
		title,
		url,
		techs
	};
	projects[projectIndex] = project;

	return response.json(project);

});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const projectIndex = projects.findIndex(project => project.id == id);
	if(projectIndex < 0){
		return response.status(400).json({ error: 'Project not found' });
	}
	projects.splice(projectIndex, 1);
	return response.status(204).send();
});

app.listen(3333, () => {
	console.log('🥳 Back-end started!');
});
