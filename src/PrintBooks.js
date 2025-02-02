import React, {Component} from 'react'

class PrintBooks extends Component{

    render(){
        
        const bookOptions = [
        {value: "move", print: "Move to..."},
        {value: "currentlyReading", print: "Currently Reading"},
        {value: "wantToRead", print: "Want To Read"},
        {value: "read", print: "Read"},
        {value: "none", print: "None"}
        ];
        const {books, bookUpdate} = this.props;



        return(
            <div className="bookshelf-books">
            <ol className="books-grid">
            {books.map(book => {
              if(book.imageLinks === undefined){
                book.imageLinks = {}
                book.imageLinks.thumbnail = "image not available"
              }
              return(
        <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+book.imageLinks.thumbnail+")" }}></div>
            <div className="book-shelf-changer">
              <select onChange={event => bookUpdate(book, event.target.value)} value={book.shelf}>
            {bookOptions.map(option => {
                    return(
                        <option key ={option.value} value={option.value} >{option.print}</option>
                        )})}
              </select>
            </div>
          </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors === undefined ? "" : book.authors.join(",")}</div>
        </div>
      </li>)
    })}
            </ol>
          </div>
        )
    }
}

export default PrintBooks;