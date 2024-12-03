const addNoteButton = document.getElementById('add-note');
const noteText = document.getElementById('note-text');
const notesContainer = document.getElementById('notes-container');
const themeToggleButton = document.getElementById('theme-toggle');
let editingNoteIndex = null;

// Initialize the app
window.addEventListener('load', () => {
    loadNotesFromLocalStorage();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Load notes from localStorage and render them
function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = ''; // Clear existing notes
    notes.forEach((note, index) => {
        createNoteElement(note.text, index, note.color);
    });
}

// Add or edit a note
addNoteButton.addEventListener('click', () => {
    const noteContent = noteText.value.trim();
    if (noteContent === '') return;

    const noteColor = getRandomColor();

    if (editingNoteIndex !== null) {
        // Edit existing note
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes[editingNoteIndex] = { text: noteContent, color: notes[editingNoteIndex].color };
        localStorage.setItem('notes', JSON.stringify(notes));
        editingNoteIndex = null;
    } else {
        // Add new note
        const newNote = { text: noteContent, color: noteColor };
        saveNoteToLocalStorage(newNote);
    }

    loadNotesFromLocalStorage();
    noteText.value = ''; // Clear input
});

// Save a new note to localStorage
function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Create and render a note element
function createNoteElement(text, index, color) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');
    noteDiv.style.backgroundColor = color;

    const noteTextElement = document.createElement('p');
    noteTextElement.textContent = text;

    const editButton = document.createElement('button');
    editButton.textContent = '✏️Edite';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editNote(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => deleteNote(index));

    noteDiv.appendChild(noteTextElement);
    noteDiv.appendChild(editButton);
    noteDiv.appendChild(deleteButton);

    notesContainer.appendChild(noteDiv);
}

// Edit a note
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    noteText.value = notes[index].text;
    editingNoteIndex = index;
}

// Delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1); // Remove the note at the specific index
    localStorage.setItem('notes', JSON.stringify(notes)); // Update the localStorage
    loadNotesFromLocalStorage(); // Re-render the notes after deletion
}

// Toggle light/dark mode
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});

// Random color generator for note background
function getRandomColor() {
    const colors = ['#F1C40F', '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#F39C12', '#34495E', '#16A085'];
    return colors[Math.floor(Math.random() * colors.length)];
}
