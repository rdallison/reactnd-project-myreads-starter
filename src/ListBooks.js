import React, {Component} from 'react';
import {search}  from './BooksAPI'
import {Link} from 'react-router-dom'

class ListBooks extends Component{

    state = {
        query: "",
        searchedBooks: [],
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
          
    
          
        if(query === ""){
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
      const {bookUpdate, myBooks} = this.props;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              </Link>
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value = {query}
                    onChange= {(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchedBooks.map(book => (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+book.imageLinks.thumbnail+")" }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={event => bookUpdate(book, event.target.value, myBooks)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none" selected>None</option>
                        
                      </select>
                    </div>
                  </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
              </li>
              ))}
              </ol>
            </div>
          </div>
        );
    }

}

export default ListBooks;