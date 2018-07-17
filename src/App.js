import React, {Component} from 'react';

import SearchPage from './SearchPage/SeachPage';

import HomePage from './HomePage/HomeComp';

import { Route, Switch } from "react-router-dom";

import {getAll, update} from './BooksAPI';


class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allBooks: [],
        }
    }
    
    componentDidMount() {
        this.init();
        
    }
    
    init = () => {
        getAll()
            .then(data => {
                this.setState({
                    allBooks: data,
                })
            });
    }
    
    handleUpdate = (book, shelf) => {
        
        book.shelf = shelf;
        
        update(book, shelf)
            .then(() => {
                
                let {allBooks} = this.state;
                
                if (allBooks.some(item => item.id === book.id)) {
                    this.setState(prevState => {
                        return {
                            allBooks: prevState.allBooks.map(item => {
                                if (item.id === book.id) {
                                    item = book;
                                }
                
                                return item
                            })
                        }
                    })
                }
                else {
                    this.handleAddBookToAllBooks(book)
                }
                
                
            })
    }
    
    handleAddBookToAllBooks = book => {
        
        this.setState(prevState => {
            return {
                allBooks: prevState.allBooks.push(book)
            }
        })
    }
    
    
    
    render() {
        let {allBooks} = this.state;
        
        let data = [];
        
        if (allBooks.length > 0) {
            data = [
                {
                    title: 'Currently Reading',
                    books: allBooks.filter(item => item.shelf === 'currentlyReading'),
                },
                {
                    title: 'Want To Read',
                    books: allBooks.filter(item => item.shelf === 'wantToRead'),
                },
                {
                    title: 'Read',
                    books: allBooks.filter(item => item.shelf === 'read'),
                }
            ]
        }
        
        return (
            <div>
                <Switch>
                    <Route path='/search' render={props => (
                        <SearchPage handleChangeType={this.handleUpdate} allBooks={this.state.allBooks}/>
                    )}/>
                    <Route exact path='/' render={props => (
                        <HomePage sourceData={data} handleChangeType={this.handleUpdate}/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

export default App;
