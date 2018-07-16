/**
 * @author duantao
 * @file 搜索页
 * @date 2018/7/16
 */

import React, {Component} from 'react';

import './SearchPage.css';

import {search, update} from './BooksAPI';

import BookItem from './BookComp';


class SearchPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            resultBooks: []
        }
    }
    
    handleUpdate = (book, shelf) => {
        
        update(book, shelf);
    }
    
    
    handleIsHide = () => {
        this.props.isHide(false)
    }
    
    handleGetInputValue = e => {
        let value = e.target.value.trim();
        
        if (value.length > 0) {
            search(value)
                .then(data => {
                    
                    if (data) {
                
                        this.setState({
                            resultBooks: data
                        })
                    }
                    else {
                        this.setState({
                            resultBooks: []
                        })
                    }
            
                })
        }
        else {
            this.setState({
                resultBooks: []
            })
        }
    }
    
    render() {
        return (
            <div className='search-page'>
                <div className='input-box'>
                    <a className="close-search" onClick={() => this.handleIsHide()}>Close</a>
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        onKeyUp={this.handleGetInputValue}/>
                </div>
                
                <div className='result-books-box'>
                    {
                        this.state.resultBooks.length !== 0
                            ? (
                                <ul className='books-box'>
                                    {
                                        this.state.resultBooks.map((book, key) => (
                                            <li key={key}>
                                                <BookItem
                                                    changeClass={this.handleUpdate}
                                                    book={book}
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                            : <div className='empty-books'>暂无数据</div>
                    }
                </div>
            </div>
        )
    }
}

export default SearchPage;