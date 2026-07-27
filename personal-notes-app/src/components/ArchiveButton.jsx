import React from 'react';
import { BiArchive, BiArchiveIn } from 'react-icons/bi';
import PropTypes from 'prop-types';

function ArchiveButton({ id, onArchive, onUnarchive, archived }) {
    return archived ? (
        <button
            className="action-archive"
            onClick={() => onUnarchive(id)}
            title="Pindahkan Catatan"
        >
            <BiArchiveIn />
        </button>
    ) : (
        <button
            className="action-archive"
            onClick={() => onArchive(id)}
            title="Arsipkan Catatan"
        >
            <BiArchive />
        </button>
    )
}

export default ArchiveButton;
