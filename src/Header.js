import React, { Component } from 'react'

import './Header.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.setCurrentShow = this.setCurrentShow.bind(this)
  }
  setCurrentShow() {
    this.props.onSetCurrentShow()
  }
  render() {
    return (
      <div className='Header iconfont'>
        <span className={this.props.currentShow==='MainInterface' ? "icon-list" : "icon-come-back"}
         onClick={this.setCurrentShow}>
        </span>
        <span className="icon-lrc"></span>
      </div>
    )
  }
}