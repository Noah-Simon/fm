import React, { Component } from 'react'
import './SongInfo.css'
import getUrl from './getUrl.js'

export default class SongInfo extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className='SongInfo'>
        <img src={this.props.songInfo.picture} />
        <div className="title">{this.props.songInfo.title}</div>
        <div className="artist">{this.props.songInfo.artist}</div>
      </div>
    )
  }
}