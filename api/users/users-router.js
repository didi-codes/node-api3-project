const express = require('express');

const User = require('./users-model');
const Post = require('../posts/posts-model');
const { validateUser, validateUserId } = require('../middleware/middleware')


const router = express.Router();

router.get('/', (req, res, next) => {
  User.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
  .then(() => {
    res.status(200).json({
      message: 'The user has been removed'
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res,next) => {
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
