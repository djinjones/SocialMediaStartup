const { Schema, model } = require('mongoose');

// Schema to create a Thought model
const ThoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
