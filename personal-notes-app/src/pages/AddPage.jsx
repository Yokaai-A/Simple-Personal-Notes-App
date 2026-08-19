import React from 'react';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

function AddPageWrapper() {
  const navigate = useNavigate();
  return <AddPage navigate={navigate} />;
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitChangeHandler = this.onSubmitChangeHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onBodyChangeHandler(event) {
    this.setState({
      body: event.target.value,
    });
  }

  async onSubmitChangeHandler(event) {
    event.preventDefault();

    const { error } = await addNote({
      title: this.state.title,
      body: this.state.body,
    });

    if (!error) {
      this.props.navigate('/');
    }
  }

  render() {
    return (
      <section className="add-new-page">
        <h2>Tambah Catatan</h2>
        <form onSubmit={this.onSubmitChangeHandler} className="add-new-page__input">
          <input
            type="text"
            placeholder="Judul dari Catatan..."
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            required
          />
          <textarea
            placeholder="Isi dari Catatan..."
            value={this.state.body}
            onChange={this.onBodyChangeHandler}
            required
          />
          <button type="submit">Simpan</button>
        </form> 
      </section>
    );
  }
}

export default AddPageWrapper;