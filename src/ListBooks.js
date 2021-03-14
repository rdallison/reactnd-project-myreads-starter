import React, {Component} from 'react';
import {get, getAll, search}  from './BooksAPI'

class ListBooks extends Component{

    state = {
        query: "",
        searchedBooks: [],
    };


    updateQuery = (query) => {
      this.setState({
          query: query.trim()
      })   
      search(this.state.query)
      .then(data => (
        this.setState(currentState => {
          const updatedBookSearch = currentState.searchedBooks.concat(data)
          
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

        return(
            <div className="search-books">
    {console.log(searchedBooks)}
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
              
              </ol>
            </div>
          </div>
        );
    }

}

export default ListBooks;