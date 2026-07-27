const getInitialData = () => {
    return [
        {
            id: 'notes-1',
            title: "Babel",
            body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
            archived: false,
            createdAt: '2022-04-14T04:27:34.572Z'
        }
    ]
}

let notes = getInitialData();

export function getAllNotes() {
    return notes;
}

export function getNote(id) {
    return notes.find((note) => note.id === id)
}

export function addNote({ title, body }) {
    notes = [
        ...notes, 
        {
            id: `notes-${+new Date()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
        }
    ]
}

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export function getArchivedNotes(){
    return notes.filter((note) => note.archived === true);
}

export function getActiveNotes(){
    return notes.filter((note) => note.archived === false);
}

export function archiveNote(id) {
    notes = notes.map((note) => note.id === id ? {
        ...note, archived: true
    } : note);
}

export function unarchiveNote(id) {
    notes = notes.map((note) => note.id === id ? {
        ...note, archived: false
    } : note);
}

export function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id)
}

export { showFormattedDate };