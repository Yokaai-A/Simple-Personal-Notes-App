import React from 'react';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/data';
import NoteList from '../components/NoteList';

class ArchivePage extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            notes: getArchivedNotes(),
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.setState({
            notes: getArchivedNotes(),
        });
    }

    onUnarchiveHandler(id) {
        unarchiveNote(id)

        this.setState({
            notes: getArchivedNotes(),
        })
    }

    render() {
        return(
            <section className="archive-page">
                <h2>Catatan yang Diarsipkan</h2>
                {this.state.notes.length === 0 ? (
                    <p className="notes-list__empty">Anda tidak memiliki catatan Archived</p>
                ) : (
                    <NoteList 
                        notes={this.state.notes}
                        onDelete={this.onDeleteHandler}
                        onUnarchive={this.onUnarchiveHandler}
                    />
                )}
            </section>
        )
    }
}

export default ArchivePage;