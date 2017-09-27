import React, { Component } from 'react'

import './Header.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.setCurrentShow = this.setCurrentShow.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('1should?')
    if (nextProps.currentShow === this.props.currentShow &&
        nextProps.currentShow !== 'Lyric') {
      console.log('1no')
      return false
    }
    console.log('1yes')
    return true
  }
  setCurrentShow(str) {
    this.props.onSetCurrentShow(str)
  }
  render() {
    console.log('header rendered')
    const title = this.props.currentShow === 'MainInterface' ? '' : 
     <div className="title">{this.props.currentSongInfo.title}</div>
    const artist = this.props.currentShow === 'MainInterface' ? '' :
     <div className="artist">{this.props.currentSongInfo.artist}</div>
    return (
      <div className='Header iconfont'>
        <span className={this.props.currentShow === 'ClassList' ? "icon-come-back" : "icon-list"}
         onClick={this.props.currentShow === 'ClassList' ? () => {this.setCurrentShow('MainInterface')} : 
          () => {this.setCurrentShow('ClassList')} }>
        </span>
        <span className={this.props.currentShow === 'Lyric' ? "icon-come-back" : "icon-lrc"}
         onClick={this.props.currentShow === 'Lyric' ? () => {this.setCurrentShow('MainInterface')} : 
          () => {this.setCurrentShow('Lyric')} }>
        </span>
        {title}
        {artist}
      </div>
    )
  }
}