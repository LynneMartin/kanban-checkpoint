import mongoose from "mongoose"
// import ListService from './ListService'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

// let _listRepo = new ListService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  // this._id //this is the board
  // Promise.all([
  //   _listRepo.deleteMany({ boardId: this._id })  //FIXME
  // ])
  // .then(() => next())
  // .catch(err => next(err))
  next()
})


export default mongoose.model('Board', _schema)