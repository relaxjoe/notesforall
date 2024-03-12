document.addEventListener('DOMContentLoaded', function() {
  let noteForm = document.querySelector('.note-form');
  let noteTitle = document.querySelector('.note-title');
  let noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let newNoteBtn = document.querySelector('.new-note');
  let clearBtn = document.querySelector('.clear-btn');
  let noteList = document.querySelectorAll('.list-container .list-group');

  let activeNote = {};

  // Utility functions for showing and hiding elements
  const show = (elem) => elem.style.display = 'inline';
  const hide = (elem) => elem.style.display = 'none';

  // Initially hide certain buttons
  hide(saveNoteBtn);
  hide(clearBtn);
  hide(newNoteBtn);

  // Function to get notes from server
  const getNotes = () => fetch('/api/notes', { method: 'GET', headers: { 'Content-Type': 'application/json' }});

  // Function to save a note to the server
  const saveNote = (note) => fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note) });

  // Function to delete a note from the server
  const deleteNote = (id) => fetch(`/api/notes/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }});

  // Renders the active note or provides an empty form for a new note
  const renderActiveNote = () => {
      hide(saveNoteBtn);
      hide(clearBtn);

      if (activeNote.id) {
          show(newNoteBtn);
          noteTitle.setAttribute('readonly', true);
          noteText.setAttribute('readonly', true);
          noteTitle.value = activeNote.title;
          noteText.value = activeNote.text;
      } else {
          hide(newNoteBtn);
          noteTitle.removeAttribute('readonly');
          noteText.removeAttribute('readonly');
          noteTitle.value = '';
          noteText.value = '';
      }
  };

  // Saves the note then fetches and renders the note list again
  const handleNoteSave = () => {
      const newNote = { title: noteTitle.value, text: noteText.value };
      saveNote(newNote).then(() => {
          getAndRenderNotes();
          renderActiveNote();
      });
  };

  // Handles the note delete button click
  const handleNoteDelete = (e) => {
      e.stopPropagation();
      const noteId = JSON.parse(e.target.parentElement.getAttribute('data-note')).id;

      if (activeNote.id === noteId) activeNote = {};
      deleteNote(noteId).then(() => {
          getAndRenderNotes();
          renderActiveNote();
      });
  };

  // Handles clicking on a note to view it
  const handleNoteView = (e) => {
      e.preventDefault();
      activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
      renderActiveNote();
  };

  // Resets the form for a new note
  const handleNewNoteView = () => {
      activeNote = {};
      renderActiveNote();
  };

  // Show or hide the save and clear buttons based on text input
  const handleRenderBtns = () => {
      if (!noteTitle.value.trim() && !noteText.value.trim()) {
          hide(saveNoteBtn);
          hide(clearBtn);
      } else {
          show(saveNoteBtn);
          show(clearBtn);
      }
  };

  // Renders the list of note titles
  const renderNoteList = async (notes) => {
      let jsonNotes = await notes.json();
      if (window.location.pathname === '/notes') {
          noteList.forEach((el) => el.innerHTML = '');
          let noteListItems = jsonNotes.map(note => {
              const li = document.createElement('li');
              li.classList.add('list-group-item');
              const span = document.createElement('span');
              span.classList.add('list-item-title');
              span.innerText = note.title;
              span.addEventListener('click', handleNoteView);

              li.appendChild(span);

              const delBtn = document.createElement('i');
              delBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
              delBtn.addEventListener('click', handleNoteDelete);
              li.appendChild(delBtn);

              li.setAttribute('data-note', JSON.stringify(note));
              return li;
          });

          noteListItems.forEach(item => noteList[0].appendChild(item));
      }
  };

  // Fetches notes and renders them to the sidebar
  const getAndRenderNotes = () => getNotes().then(renderNoteList);

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', () => {
      noteTitle.value = '';
      noteText.value = '';
      activeNote = {};
      hide(saveNoteBtn);
      hide(clearBtn);
  });
  noteForm.addEventListener('input', handleRenderBtns);

  getAndRenderNotes();
});
