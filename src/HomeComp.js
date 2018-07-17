/**
 * @author duantao
 * @file 主页
 * @date 2018/7/17
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getAll, update} from './BooksAPI';
import './App.css';
import BookItem from "./BookComp";

class HomePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            readBook: [],
            wantBook: [],
            currentBook: [],
        }
        
    }
    
    componentDidMount() {
        
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
        let {currentBook, readBook, wantBook} = this.state;
        return (
            <div className="App">
                <div className='toggle-search-page'>
                    <Link to='/search' />
                </div>
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
}

export default HomePage;