import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  listId: { type: ObjectId, ref: 'List', required: true},
  authorId: { type: ObjectId, ref: 'User', required: true },
  
}, { timestamps: true })

export default mongoose.model('Task', _schema)