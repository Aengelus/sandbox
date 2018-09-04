// This file is used to hold the routes, so when you use a particular
// path in your browser this will route you to the right destination.
module.exports = (app) => {
    // The controller will contain methods for handling all the CRUD operations.
    const notes = require('../controllers/note.controller.js');

    // Create a Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retriefe a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}