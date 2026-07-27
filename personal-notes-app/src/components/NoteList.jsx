import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onArchive, onUnarchive }) {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    createdAt={note.createdAt}
                    body={note.body}
                    archived={note.archived}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                />
            ))}
        </div>
    )
}

export default NoteList;