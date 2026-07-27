import React from 'react';
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/data';
import NoteList from '../components/NoteList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: getActiveNotes(),
      archivedNotes: getArchivedNotes(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
  }

  refreshNotes() {
    this.setState({
      activeNotes: getActiveNotes(),
      archivedNotes: getArchivedNotes(),
    });
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.refreshNotes();
  }

  onArchiveHandler(id) {
    archiveNote(id);
    this.refreshNotes();
  }

  onUnarchiveHandler(id) {
    unarchiveNote(id);
    this.refreshNotes();
  }

  render() {
    const { activeNotes, archivedNotes } = this.state;

    return (
      <section className="home-page">
        <section>
          <h2>Catatan Aktif</h2>
          {activeNotes.length === 0 ? (
            <p className="notes-list__empty">Tidak ada catatan aktif</p>
          ) : (
            <NoteList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          )}
        </section>

        <section>
          <h2>Arsip</h2>
          {archivedNotes.length === 0 ? (
            <p className="notes-list__empty">Tidak ada catatan arsip</p>
          ) : (
            <NoteList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onUnarchive={this.onUnarchiveHandler}
            />
          )}
        </section>
      </section>
    );
  }
}

export default HomePage;

