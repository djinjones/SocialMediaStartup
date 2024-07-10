const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = require('./Thought');

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 65,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    reactions: [reactionSchema],
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', UserSchema);

module.exports = User;
