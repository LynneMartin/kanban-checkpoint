//NOTE This page was pre-written by CodeWorks

import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import _listRepo from '../services/ListService.js'
import _boardService from '../services/BoardService'


//PUBLIC
export default class BoardsController {
  constructor() {
    this.router = express.Router()
    .get('/:id/lists', this.getListByBoardId)
    .get('', this.getAll)
    .get('/:id', this.getById)
    .post('', this.create)
    .delete('/:id', this.delete)
      .use(Authorize.authenticated)
      // .put('/:id', this.edit)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getListByBoardId(req, res, next) {
    try {
      let data = await _listRepo.find({
        boardId: req.params.id
      })
      return res.send(data)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _boardService.find({ authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await _boardService.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _boardService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      console.log('Entered delete board')
      await _boardService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      //REVIEW where are params & session inputs coming from in findOneAndRemove above?
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


