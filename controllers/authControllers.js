const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const myProfile = async(req, res) => {
  try {
    console.log("req.user.id=",req.user.id)
    const userProfile = await User.findById(req.user.id).select('-_id -password');
    return res.status(200).json({ success: true, data: userProfile });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const mustLogin = (req,res,next) => {
  
  const token = req.header('x-auth-token')
  if (!token) return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload;
    return next();
  } catch(err) {
    return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  }
}

const allowedRoles = (allowedRoles) => {
  return (req,res,next) => {
    // check if allowedRoles is an array
    if (!Array.isArray(allowedRoles)) throw new Error('Error: allowedRoles must be an array');
    // check if allowedRoles has at-least one element
    if (allowedRoles.length===0) throw new Error('Error: allowedRoles must contain at-least one element');
    // double-check that the user is actually logged-in
    if (!req.user) return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
    // simple destructuring
    const { isBusiness, isAdmin } = req.user;
    
    // let's actually start checking if our user has one of the roles from allowedRoles
    let hasRole = false;

    // check agains allowedRoles
    if (allowedRoles.includes('admin') && isAdmin) hasRole=true;
    if (allowedRoles.includes('business') && isBusiness) hasRole=true;
    if (allowedRoles.includes('ownUser') && jwt.decode(req.header('x-auth-token')).id === req.params.id) hasRole = true;

    // user does not meet the required roles
    if (!hasRole) {
      const allowedRolesString = allowedRoles.join('/')
      return res.status(401).json({ success: false, message: `Unauthorized: only ${allowedRolesString} users can access this resource` })
    }

    // allowed !
    return next();
  }
}

module.exports = {
  myProfile,
  mustLogin,
  allowedRoles,
};
