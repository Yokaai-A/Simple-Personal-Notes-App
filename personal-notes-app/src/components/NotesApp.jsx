import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import { ThemeProvider } from '../context/ThemeContext';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import Navigation from './Navigation';
import AddPage from '../pages/AddPage';
import ArchivePage from '../pages/ArchivePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { MdDarkMode, MdOutlineLightMode, MdLogout } from 'react-icons/md';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null, 
      initializing: true, 
      theme: localStorage.getItem('theme') || 'dark',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          }
        });
      }
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme)

    const { data }= await getUserLogged();

    this.setState({ 
      authedUser: data, 
      initializing: false 
    })
  }

  componentDidUpdate(prevProps, prevState) {
  if (prevState.theme !== this.state.theme) {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }
}
  
  async onLoginSuccess() {
    const { data } = await getUserLogged();
    this.setState({
      authedUser: data,
    })
  }

  onLogout() {
    this.setState({
      authedUser: null,
    })

    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    const contextValue = {
      theme: this.state.theme,
      toggleTheme: this.state.toggleTheme,
    };

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={contextValue}>
          <div className="app-container">
            <header>
              <h1><Link to="/">Aplikasi Catatan</Link></h1>
              <div className="header-actions">
                <button className="toggle-theme" onClick={this.state.toggleTheme} title="Ganti Tema">
                  {this.state.theme === 'dark' ? <MdOutlineLightMode /> : <MdDarkMode />}
                </button>
              </div>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={contextValue}>
        <div className="app-container">
          <header>
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
            <div className="header-actions">
              <nav className="navigation">
                <ul>
                  <li><Link to="/archives">Arsip</Link></li>
                  <li><Link to="/notes/new">Tambah Catatan</Link></li>
                </ul>
              </nav>
              <button className="toggle-theme" onClick={this.state.toggleTheme} title="Ganti Tema">
                {this.state.theme === 'dark' ? <MdOutlineLightMode /> : <MdDarkMode />}
              </button>
              <button className="button-logout" onClick={this.onLogout} title="Keluar">
                <MdLogout /> {this.state.authedUser.name}
              </button>
            </div>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default NotesApp;

