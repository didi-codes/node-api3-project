const Post = require('../posts/posts-model');
const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

async function validateUserId(req, res, next) {
  const {id} = req.params
  try {
    const user = await User.getById(id)
    if(!user) {
      res.status(404).json({
        message: 'User Not Found'
      })
    } else {
      req.user = user
      next()
    }
  } catch(err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({
      message: 'name is required'
    })
  } else {
    next()
  }
}

 function validatePost(req, res, next) {
  
}

module.exports = {
  logger,
  validateUserId,
  validateUser
};

