const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
//http://localhost:3001/api/notes

router.use('/notes', notesRouter);



module.exports = router;
