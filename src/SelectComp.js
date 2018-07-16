/**
 * @author duantao
 * @file 选择组件
 * @date 2018/7/16
 */

import React, {Component} from 'react';

import './SelectItem.css';


class SelectItem extends Component {
    
    selectChange = e => {
        let {handleChangeSelectValue} = this.props;
        
        handleChangeSelectValue(e.target.value);
    }
    
    render() {
        
        let {shelf} = this.props;
        return (
            <div className='select-item'>
                <select value={shelf} onChange={this.selectChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectItem;


