import React, {Component} from 'react';

import SearchPage from './SeachPage';

import HomePage from './HomeComp';

import { Route, Switch } from "react-router-dom";


class App extends Component {
    
    
    render() {
        
        
        
        return (
            <div>
                <Switch>
                    <Route path='/search' render={props => <SearchPage/>}/>
                    <Route exact path='/' render={props => (
                        <HomePage/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

export default App;
