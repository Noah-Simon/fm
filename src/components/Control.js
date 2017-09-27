import React, { Component } from 'react'

import './Control.css'

export default class Control extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevVolume: this.props.music.volume,
      volumeBtnClass: "icon-volume"
    }
  }
  componentDidMount() {
    this.props.music.addEventListener('volumechange', () => {
      if (this.props.music.volume === 0) {
        this.setState({
          volumeBtnClass: "icon-muted"
        })
      } else {
        this.setState({
          volumeBtnClass: "icon-volume"
        })
      }
    })
  }
  render() {
    let playOrPauseBtn = !this.props.isPlaying ?
    <span className="icon-play" onClick={this.props.play}></span> : 
    <span className="icon-pause" onClick={this.props.pause}></span>
    let playModeBtn = this.props.isSingleCycle ? 
      <span className="icon-single-cycle" onClick={this.props.toggleMode}></span> :
      <span className="icon-play-random" onClick={this.props.toggleMode}></span>
    let volumeBtn = <span className={this.state.volumeBtnClass} onClick={() =>
      {
        let currentVolume = this.props.music.volume
        if (currentVolume!==0) {
          this.props.music.volume = 0
          currentVolume = this.props.music.volume
        } else {
          this.props.music.volume = this.state.prevVolume
        }
      }}></span>
    return (
      <div className="Control iconfont">
        <div className="volume">
          {volumeBtn}       
          <div className="wholeBar" ref="wholeBar" onClick={(e) => 
            {
              const w = e.nativeEvent.offsetX / parseInt(getComputedStyle(this.refs.wholeBar).width, 10)
              this.props.music.volume = w
              this.setState({
                prevVolume: w
              })
            }
          }>
            <div className="volumeBar" style={{width: this.state.prevVolume*100+'%'}}></div>
          </div>
        </div>
        <span className="icon-play-last" onClick={this.props.playNext}></span>
        {playOrPauseBtn}
        <span className="icon-play-next" onClick={this.props.playNext}></span>
        {playModeBtn}
      </div>
    )
  }

}