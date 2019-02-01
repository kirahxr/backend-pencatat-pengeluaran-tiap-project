'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  // user
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');

  // projects
  Route.get('projects', 'ProjectController.show').middleware('auth');
  Route.post('projects', 'ProjectController.create').middleware('auth');
  Route.delete('projects/:id', 'ProjectController.delete').middleware('auth');
  Route.patch('projects/:id', 'ProjectController.update').middleware('auth');

  // show detail of a specific projects with its cost
  Route.get('projects/:id', 'CostController.show').middleware('auth');

  // costs
  Route.post('costs/:id', 'CostController.create').middleware('auth');
  Route.delete('costs/:id', 'CostController.delete').middleware('auth');
  Route.patch('costs/:id', 'CostController.update').middleware('auth');
  

})
  .prefix('api/v0');
