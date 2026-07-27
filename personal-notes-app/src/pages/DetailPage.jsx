import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote, showFormattedDate } from '../utils/data';
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
            note: getNote(props.id)
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.props.navigate('/');
    }

    onArchiveHandler(id) {
        if (this.state.note.archived === false) {
            archiveNote(id);
        } else {
            unarchiveNote(id);
        }
        this.props.navigate('/');
    }

    render() {
        if (!this.state.note) {
            return (
                <section className="detail-page"> 
                    <h2>Catatan tidak ditemukan</h2>
                    <Link to='/'>Kembali ke Halaman Utama</Link>
                </section>
            );
        }

        return (
            <section className="detail-page">
                <h2>{this.state.note.title}</h2>
                <p>{this.state.note.body}</p>
                <p>{showFormattedDate(this.state.note.createdAt)}</p>
                <div className="detail-page__action">
                    <ArchiveButton
                        id={this.state.note.id}
                        archived={this.state.note.archived}
                        onArchive={this.onArchiveHandler}
                        onUnarchive={this.onArchiveHandler}
                    />
                    <DeleteButton
                        id={this.state.note.id}
                        onDelete={this.onDeleteHandler}
                    />
                </div>
                <Link to="/">Kembali</Link>
            </section>
        );
    }
}

export default DetailPageWrapper;
