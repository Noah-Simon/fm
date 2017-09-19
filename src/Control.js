import React, { Component } from 'react'

import './Control.css'

export default class Control extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const playOrPauseBtn = !this.props.isPlaying ?
     <span className="icon-play" onClick={this.props.play}></span> : 
     <span className="icon-pause" onClick={this.props.pause}></span>
    return (
      <div className="Control iconfont">
        <span className="icon-play-last" onClick={this.props.playNext}></span>
        {playOrPauseBtn}
        <span className="icon-play-next" onClick={this.props.playNext}></span>
      </div>
    )
  }
}