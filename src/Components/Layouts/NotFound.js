import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            Страница не найдена. Вернуться на <Link to='/'>главную страницу</Link>?
          </div>
        </div>
      </div>
    )
  }
}
