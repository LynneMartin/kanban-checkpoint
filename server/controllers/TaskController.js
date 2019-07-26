import TaskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize'

//import service and create an instance
// let TaskService = new TaskService()

//Public
export default class TasksController {
  constructor() {
    this.router = express.Router()
      // .get('', this.getAll)
      .get('', this.getAllTasksByList)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.delete)
      .use(Authorize.authenticated)
      // .put('/:id', this.edit)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'Route not found' })
  }
  async getAllTasksByList(req, res, next) {
    try {
      //gets tasks by logged in user
      let data = await TaskService.find({
        authorId: req.session.uid
      })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getById(req, res, next) {
    try {
      let data = await TaskService.findOne({
        _id: req.params.id, authorId: req.session.id
      })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {  //POST
    try {
      req.body.authorId = req.session.uid
      let data = await TaskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await TaskService.findOneAndRemove({
        _id: req.params.id, authorId: req.session.uid
      })
      return res.send('Deleted sucessfully')
    } catch (error) { next(error) }
  }
}