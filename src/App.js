import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import {getAll, update}  from './BooksAPI'
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
  
  bookUpdate = (book, event) => {

    const {myBooks} = this.state;

    //Checks to see if we set the bookshelf to none
    //If so we need to remove the book from the shelf

    if(book.shelf === "none"){
      const minusBook = this.state.myBooks.filter(currentBook =>
        currentBook.title !== book.title)
      
        this.setState({
        myBooks: minusBook
      })
    }

    //Checks to see if we updated the shelf for a certain book
    //If so, we need to call the update method and update the book in our state to cause the rerender

    update(book, event)
    let updatedShelf = myBooks.map(currentBook => {
      if(currentBook.id === book.id){
        currentBook.shelf = event
      }
      return currentBook
    })

    let found = false;
      updatedShelf.forEach((current) => {
        if(current.title === book.title){
          found = true
        }
      })

      if(found === false){
        updatedShelf = updatedShelf.concat(book)
      }      

     this.setState({
      myBooks: updatedShelf
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
        

        <Route exact path="/search" component={() => <ListBooks bookUpdate={this.bookUpdate} myBooks={this.state.myBooks}/>}></Route>
      </div>
    )
  }
}

export default BooksApp
