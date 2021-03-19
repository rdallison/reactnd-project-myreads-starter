import React, {Component} from 'react';
import {search}  from './BooksAPI'
import {Link} from 'react-router-dom';


class ListBooks extends Component{

    state = {
        query: "",
        searchedBooks: []
    };

    updateQuery = (query) => {
      this.setState({
          query: query
      })   
      search(query)
      .then(data => (
        this.setState(currentState => {
          const updatedBookSearch = data

          if(updatedBookSearch.error){
            
            return{searchedBooks: []}
            }
          
    
          
        if(query === "" || query === undefined || query === null){
          return{searchedBooks: []}
        }
        if(query.length >= 1){
          return{
            searchedBooks: updatedBookSearch
          }
        }  
        
        
        })))}

     
  render(){

      const {query, searchedBooks} = this.state;
      const {myBooks, addBooks} = this.props;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search">Close</button>
              </Link>
              
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value = {query}
                    onChange= {(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchedBooks.map(book => {
                const bookOnShelf = myBooks.find(({id}) => book.id === id);
                return(
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">                    
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+book.imageLinks.thumbnail+")" }}></div>
                    <div className="book-shelf-changer">
                      {console.log(bookOnShelf)}
                      <select onChange={event => addBooks(book, event.target.value)} value={bookOnShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        
                      </select>
                    </div>
                  </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                    
                </div>
              </li>);
                })}
              </ol>
            </div>
          </div>
        );
    }

}

export default ListBooks;