import moment from 'moment'
import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
  group: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    default: moment().toISOString(),
  },
  message: {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    relatedMessage: {
      type: String,
      required: true,
      trim: true,
      default: null,
    },
  },
})

MessageSchema.statics.addMessage = (data, callback) => {
  data.save(callback)
}

MessageSchema.statics.getMessageById = (id, callback) => {
  Message.findById(id, callback)
}

MessageSchema.statics.getRelatedMessageById = (id, callback) => {
  Message.find({message: {relatedMessage: id}}, callback)
}

const Message = mongoose.model('Message', MessageSchema)

export default Message
