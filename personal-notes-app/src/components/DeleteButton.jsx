import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

function DeleteButton({ id, onDelete }) {
  return (
    <button className="note-item__delete" onClick={() => onDelete(id)} title="Hapus Catatan">
      <FiTrash2 />
    </button>
  );
}

export default DeleteButton;
