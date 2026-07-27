import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate  } from '../utils/data';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

function NoteItem({ id, title, createdAt, body, archived, onDelete, onArchive, onUnarchive }) {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <h2 className="note-item__title">
                    <Link to={`/notes/${id}`}>{title}</Link>
                </h2>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <div className="note-item__action">
                <ArchiveButton 
                    id={id}
                    archived={archived}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                />
                <DeleteButton id={id} onDelete={onDelete}/>
            </div>
        </div>
    )
}

export default NoteItem;