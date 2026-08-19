import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import DeleteButton from '../components/DeleteButton';
import ArchiveButton from '../components/ArchiveButton';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      initializing: true,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    this.setState({
      note: data,
      initializing: false,
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    this.props.navigate('/');
  }

  async onArchiveHandler(id) {
    if (this.state.note.archived === false) {
      await archiveNote(id);
    } else {
      await unarchiveNote(id);
    }
    this.props.navigate('/');
  }

  render() {
    if (this.state.initializing) {
      return <p className="notes-list__empty">Memuat detail catatan...</p>;
    }

    if (!this.state.note) {
      return (
        <section className="detail-page"> 
          <h2>Catatan tidak ditemukan</h2>
          <Link to="/">Kembali ke Halaman Utama</Link>
        </section>
      );
    }

    const { id, title, body, createdAt, archived } = this.state.note;

    return (
      <section className="detail-page">
        <h2>{title}</h2>
        <p>{body}</p>
        <p>
          {new Date(createdAt).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="detail-page__action">
          <ArchiveButton
            id={id}
            archived={archived}
            onArchive={this.onArchiveHandler}
            onUnarchive={this.onArchiveHandler}
          />
          <DeleteButton
            id={id}
            onDelete={this.onDeleteHandler}
          />
        </div>
        <Link to="/">Kembali</Link>
      </section>
    );
  }
}

export default DetailPageWrapper;