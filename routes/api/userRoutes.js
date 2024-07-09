const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/Users
//router.route('/all').get(getUsers);

router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);


router.route('/:userId/reactions').post(addReaction);


router.route('/:userId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
