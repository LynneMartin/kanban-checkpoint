import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import _listRepo from '../services/ListService.js'
import _listService from '../services/ListService'
import _taskService from '../services/TaskService'

//PUBLIC
export default class ListController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTaskByListId)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      //only gets lists by user who is logged in
      let data = await _listService.find({ authorId: req.session.uid })  //REVIEW Change _listService to _repo?
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await _listService.findOne({ _id: req.params.id, authorId: req.session.uid })  //REVIEW Change _listService to _repo?
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTaskByListId(req, res, next) {
    try {
      let data = await _listRepo.find({  //REVIEW Change _repo to _listService?
        listId: req.params.id
      })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _listService.create(req.body)  //REVIEW Change _listService to _repo?
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let list = await _listService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })  //REVIEW Change _listService to _repo?
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}