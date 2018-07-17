/**
 * @author duantao
 * @file 主页
 * @date 2018/7/17
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";

import '../App.css';
import BookItem from "../BooksBoxPage/BookComp";

class HomePage extends Component {
    
    
    render() {
        
        let {sourceData, handleChangeType} = this.props;
        
        return (
            <div className="App">
                <div className='toggle-search-page'>
                    <Link to='/search' />
                </div>
                <h1>MyReads</h1>
                {
                    sourceData && sourceData.length > 0
                        ? (
                            sourceData.map((list, key) => (
                                <div className='books-classify-box current-box' key={key}>
                                    <h2>{list.title}</h2>
                                    {
                                        list.books.length === 0
                                            ? <div className='empty-books'>暂无数据</div>
                                            : (
                                                <ul className='books-box'>
                                                    {list.books.map((book, key) => (
                                                        <li key={key}>
                                                            <BookItem changeType={handleChangeType} book={book}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                    }
                                </div>
                            ))
                        )
                        : '加载中!!!'
                }
                
            </div>
        )
    }
}

export default HomePage;