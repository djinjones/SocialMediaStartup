const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addReaction,
  removeReaction,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/Users
//router.route('/all').get(getUsers);

router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);


router.route('/:userId/reactions').post(addReaction);


router.route('/:userId/reactions/:reactionId').delete(removeReaction);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
