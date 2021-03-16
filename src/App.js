import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import {get, getAll, search, update}  from './BooksAPI'
import PrintBooks from './PrintBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    myBooks: [],
    showSearchPage: false,
    book: {}
  }

  componentDidMount(){
    getAll()
    .then(data => (
      this.setState({
        myBooks: data
      })
    ))
  }
  
  bookUpdate(book, event){
    update(book, event)
     this.setState({
      book: book
    })
  }

  render() {

    
    const currReading = this.state.myBooks.filter(book => book.shelf === "currentlyReading");
    const wantToRead = this.state.myBooks.filter(book => book.shelf === "wantToRead");
    const alreadyRead = this.state.myBooks.filter(book => book.shelf === "read");


    return (
      <div className="app">
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
                </div>
                <div className="bookshelf">
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                <PrintBooks books={currReading} bookUpdate={this.bookUpdate}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                <PrintBooks books={wantToRead} bookUpdate={this.bookUpdate}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                 <PrintBooks books={alreadyRead} bookUpdate={this.bookUpdate}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button className="open-search">Add Book</button> </Link>
            </div>
          </div>
          </Route>
        

        <Route exact path="/search" component={ListBooks}></Route>
      </div>
    )
  }
}

export default BooksApp
