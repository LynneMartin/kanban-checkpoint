import mongoose from "mongoose"
// import TaskService from './TaskService.js'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

// let _taskRepo = new TaskService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
// _schema.pre('deleteMany', function (next) {
//lets find all the lists and remove them
// this._id //this is the board
// Promise.all([
// @ts-ignore
// _taskRepo.deleteMany({ listId: this._id }),
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

//CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//lets find all the lists and remove them
// Promise.all([
// @ts-ignore
// _taskRepo.deleteMany({ boardId: this._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default mongoose.model('List', _schema)