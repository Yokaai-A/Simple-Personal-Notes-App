import React from 'react';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import NoteList from '../components/NoteList';

class ArchivePage extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      initializing: true,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();
    this.setState({
      notes: data || [],
      initializing: false,
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    this.setState({
      notes: data || [],
    });
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    this.setState({
      notes: data || [],
    });
  }

  render() {
    if (this.state.initializing) {
      return <p className="notes-list__empty">Memuat catatan arsip...</p>;
    }

    return (
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
    );
  }
}

export default ArchivePage;