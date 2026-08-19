import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import NoteList from '../components/NoteList';
import { MdAdd } from 'react-icons/md';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: [],
      archivedNotes: [],
      initializing: true,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
  }

  async componentDidMount() {
    await this.refreshNotes();
    this.setState({ initializing: false });
  }

  async refreshNotes() {
    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();

    this.setState({
      activeNotes: activeNotes || [],
      archivedNotes: archivedNotes || [],
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    await this.refreshNotes();
  }

  async onArchiveHandler(id) {
    await archiveNote(id);
    await this.refreshNotes();
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);
    await this.refreshNotes();
  }

  render() {
    if (this.state.initializing) {
      return <p className="notes-list__empty">Memuat catatan...</p>;
    }

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

        <div className="homepage__action">
          <Link to="/notes/new" className="action" title="Tambah Catatan">
            <MdAdd />
          </Link>
        </div>
      </section>
    );
  }
}

export default HomePage;