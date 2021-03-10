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
    res.status(500).json(`Server error: ${err}`)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
  validateUserId
};

