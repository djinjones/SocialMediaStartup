const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const { Mongoose } = require('mongoose');
// Aggregate function to get the number of Users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

// Aggregate function for getting the overall grade using $avg
const grade = async (userId) =>
  User.aggregate([
    // only include the given User by using $match
    { $match: { _id: new ObjectId(userId) } },
    {
      $unwind: '$reactions',
    },
    // {
    //   $group: {
    //     _id: new ObjectId(UserId),
    //     overallGrade: { $avg: '$reactions.score' },
    //   },
    // },
  ]);

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      console.log('getting users...')
      const users = await User.find();
      const UserObj = {
        users,
        headCount: await headCount(),
      };

      res.json(UserObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single User
  async getSingleUser(req, res) {
    try {
      console.log('getting single user...')
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      console.log('creating user...')
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  },

  async updateUser(req, res) {
    try {
      console.log('updating user...');
      const { username, email } = req.body;
      const updateFields = {};
  
      if (username) updateFields.username = username;
      if (email) updateFields.email = email;
  
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "Request body must have email or username" });
      }
  
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        updateFields,
        { new: true, runValidators: true }
      ).select('-__v');
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  //  try { 
  //   console.log('updating user...')
  //    if (req.body.username && !req.body.email) {
  //      const user = await User.findOne({ _id: req.params.userId })
  //     .select('-__v').update({ username: req.body.username });
  //     res.status(200).json(user);
  //     } else if (!req.body.username && req.body.email) {
  //       const user = await User.findOne({ _id: req.params.userId })
  //       .select('-__v').update({ email: req.body.email });
  //       res.status(200).json(user);
  //     } else if (!req.body.username && !req.body.email) {
  //       res.status(404).json({ message: "body must have email or username"})
  //     } else {
  //       const user = await User.findOne({ _id: req.params.userId })
  //       .select('-__v').update({ username: req.body.username, email: req.body.email });
  //       res.status(200).json(user);
  //     }
  //  } catch (err) {
  //   res.status(500).json(err);
  //   console.error(err);
  //  }
  },
 
  async deleteUser(req, res) {
    try {
      console.log('deleting user...')
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'user deleted, but no thoughts found',
        });
      }

      res.json({ message: 'user successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a User
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a User
  async removeReaction(req, res) {
    try {
      console.log('removeing reaction...')
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
