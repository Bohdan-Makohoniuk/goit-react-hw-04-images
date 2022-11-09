import { Component } from 'react';
// import {toast} from 'react-toastify';

class Searchbar extends Component{
    state = {
    query: '',
  };
// Відслідковує та відображає набране в state.query до Submit
  handleChange = e => {
    const query = e.target.value;
    // Очищення query після Submit
    this.setState({ query });
  };
// Передає стан query в App після Submit 
  handleSubmit = e => {
    // preventDefault блокує перезавантаження сторінки
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return alert('add Serch');
      // toast.info("add Serch");
    }
    
    this.props.onSubmit(this.state.query);
  };
    render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button className="SearchForm-button" type="submit">
            Пошук
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
    
}
export default Searchbar