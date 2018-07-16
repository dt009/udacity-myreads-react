import React, {Component} from 'react';
import './App.css';

import {getAll, update} from './BooksAPI';

import BookItem from "./BookComp";

import SearchPage from './SeachPage';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            readBook: [],
            wantBook: [],
            currentBook: [],
            isSearchShow: false,
        }
        
    }
    
    componentDidMount() {
        this.init();
    }
    
    handleToggleSearchPage = bool => {
        this.setState({
            isSearchShow: bool
        });
        
        this.init();
    }
    
    init = () => {
        getAll().then(data => {
            this.setState({
                readBook: data.filter(item => item.shelf === 'read'),
                currentBook: data.filter(item => item.shelf === 'currentlyReading'),
                wantBook: data.filter(item => item.shelf === 'wantToRead')
            })
        });
    }
    
    update = (book, shelf) => {
        update(book, shelf)
            .then(() => {
                this.init()
            })
    };
    
    render() {
        
        let {currentBook, readBook, wantBook, isSearchShow} = this.state;
        return (
            <div>
                {
                    isSearchShow
                        ? <SearchPage isHide={this.handleToggleSearchPage}/>
                        : (
                            <div className="App">
                                <div className='toggle-search-page' onClick={() => this.handleToggleSearchPage(true)}></div>
                                <h1>MyReads</h1>
                                <div className='books-classify-box current-box'>
                                    <h2>Currently Reading</h2>
                                    {
                                        currentBook.length === 0
                                            ? <div className='empty-books'>暂无数据</div>
                                            : (
                                                <ul className='books-box'>
                                                    {currentBook.map((book, key) => (
                                                        <li key={key}>
                                                            <BookItem changeClass={this.update} book={book}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                    }
                                </div>
                                <div className='books-classify-box current-box'>
                                    <h2>Want To Read</h2>
                                    {
                                        wantBook.length === 0
                                            ? <div className='empty-books'>暂无数据</div>
                                            : (
                                                <ul className='books-box'>
                                                    {wantBook.map((book, key) => (
                                                        <li key={key}>
                                                            <BookItem changeClass={this.update} book={book}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                    }
                                </div>
                                <div className='books-classify-box current-box'>
                                    <h2>Read</h2>
                                    {
                                        readBook.length === 0
                                            ? <div className='empty-books'>暂无数据</div>
                                            : (
                                                <ul className='books-box'>
                                                    {readBook.map((book, key) => (
                                                        <li key={key}>
                                                            <BookItem changeClass={this.update} book={book}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default App;
