//THIS FILE STAYS BASICALLY THE SAME
import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//TODO: ADD YOUR CONNECTION STRING!!!
const connectionString = "mongodb+srv://LLM208:teeth208@cluster0-rt3sr.mongodb.net/kanban?retryWrites=true&w=majority"

export default class DbContext {
  static async connect() {
    try {
      let status = await mongoose.connect(connectionString)
      console.log("CONNECTED")
      return status
    } catch (e) {
      console.error(e)
    }
  }
}