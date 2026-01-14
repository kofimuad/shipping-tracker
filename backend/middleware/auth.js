const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const employeeOnly = (req, res, next) => {
  if (req.userRole !== 'employee') {
    return res.status(403).json({ success: false, message: 'Access denied. Employee only.' });
  }
  next();
};

module.exports = { auth, employeeOnly };