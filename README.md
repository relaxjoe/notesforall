# notesforall


## Description

This Note Taker application allows users to create, view, save, and delete notes. It's designed to help individuals keep track of tasks, appointments, or any personal notes they need to remember. The application is built with a Node.js backend and uses Express to serve pages and manage API requests.

## Features

Create Notes: Users can add new notes with titles and text.
View Notes: Notes are listed in a sidebar, and users can click on any note to view its details.
Delete Notes: Users can delete notes they no longer need.
Save Notes: Newly created or edited notes can be saved using an API.
Installation

To run the Note Taker application locally, follow these steps:

# Clone the repository:
```bash

git clone https://your-repository-url.com
```
## Navigate to the repository directory:
```bash
cd note-taker
```

## Install dependencies:
```bash
npm install
```

## Start the server:
```bash
npm start
```
## Usage
```
After starting the server, access the application by navigating to http://localhost:3001 in your web browser.
```
```
Homepage: The homepage provides a link to the notes page.
Notes Page: Here, you can view, create, and delete notes.
API Endpoints
```
```
GET /api/notes: Fetches all notes.
POST /api/notes: Saves a new note to the server.
DELETE /api/notes/:id: Deletes the note with the specified ID.
```
## Technologies Used
```
Node.js: JavaScript runtime environment.
Express.js: Web application framework for Node.js.
HTML/CSS: Frontend design.
Heroku: Cloud platform for deploying the application
```