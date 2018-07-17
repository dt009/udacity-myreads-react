/**
 * @author duantao
 * @file 单个书本的组件
 * @date 2018/7/16
 */

import React from 'react';

import SelectItem from '../SelectTypePage/SelectComp';

import './BookComp.css';
//
// class BookItem extends Component {
//
//     handleChangeClass = value => {
//         this.props.changeClass(this.props.book, value);
//     };
//
//     render() {
//
//         let {book} = this.props;
//
//
//         book.shelf = book.shelf ? book.shelf : 'none';
//
//         return (
//             <div className='book-box-item'>
//                 <div className='img-box'>
//                     <img src={book.imageLinks.smallThumbnail} alt="图片"/>
//                     <div className='select-box'>
//                         <SelectItem handleChangeSelectValue={this.handleChangeClass} shelf={book.shelf }/>
//                     </div>
//                 </div>
//                 <h3 className='book-title'>{book.title}</h3>
//                 <p className='book-author'>
//                     {
//                         book.authors &&book.authors.length > 0
//                             ? book.authors.map(item => item + '')
//                             : '暂无作者'
//
//                     }
//                 </p>
//             </div>
//         )
//     }
// }


function BookItem(props) {
    let {book, changeType} = props;
    
    let imgSrc = book.imageLinks.smallThumbnail
        ? book.imageLinks.smallThumbnail
        : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
    
    return (
        <div className='book-box-item'>
            <div className='img-box'>
                <img src={imgSrc} alt="图片"/>
                <div className='select-box'>
                    <SelectItem handleChangeSelectValue={value => changeType(book, value)} shelf={book.shelf }/>
                </div>
            </div>
            <h3 className='book-title'>{book.title}</h3>
            <p className='book-author'>
                {
                    book.authors && book.authors.length > 0
                        ? book.authors.map(item => item + '')
                        : '暂无作者'
                
                }
            </p>
        </div>
    )
}

export default BookItem;