/**
 * @author duantao
 * @file 搜索页
 * @date 2018/7/16
 */

import React, {Component} from 'react';

import './SearchPage.css';

import {search} from '../BooksAPI';

import {Link} from 'react-router-dom';

import BookItem from '../BooksBoxPage/BookComp';


class SearchPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            resultBooks: []
        }
    }
    
    
    handleGetInputValue = e => {
        let value = e.target.value.trim();
        
        if (value.length > 0) {
            search(value)
                .then(data => {
                    
                    // console.log('data ==>> ', data);
                    
                    // 这个返回的结果完全是折磨人
                    
                    if (data.length && data.length !== 0) {
                
                        this.setState({
                            resultBooks: data
                        });
                        
                        this.setState((prevState, props) => {
                            let {allBooks} = props;
                            
                            let searchBooks = data.map(books => {
                                
                                let sameBook = allBooks.find(book => book.id === books.id)
                                
                                books.shelf = sameBook ? sameBook.shelf : 'none';
                                
                                return books
                            });
                            
                            return {
                                resultBooks: searchBooks
                            };
                            
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
                    <Link className="close-search" to='/'>Close</Link>
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
                                                    changeType={this.props.handleChangeType}
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