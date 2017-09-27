import React, { Component } from 'react'

import './Control.css'

export default class Control extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: !this.props.music.paused,
      isSingleCycle: false,
      prevVolume: this.props.music.volume,
      volumeBtnClass: "icon-volume"
    }

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.playNext = this.playNext.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
  }
  componentDidMount() {
     //a temporary method for fixing the bug
    setTimeout(() => {
      this.setState({
        isPlaying: !this.props.music.paused
      })
    }, 2000);

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

    /*下面会报setState in an unmount component的错 why？ */
    // this.props.music.addEventListener('playing', () => {
    //   this.setState({
    //     isPlaying: true
    //   })
    // })
    // this.props.music.addEventListener('pause', () => {
    //   this.setState({
    //     isPlaying: false
    //   })
    // })
    this.props.music.addEventListener('ended', () => {
      if (this.state.isSingleCycle) {
        this.play()
        return 
      }
      this.props.setSongInfoAndPlay()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should?')
    if (nextState === this.state) {
      console.log('no')
      return false
    }
    console.log('yes')
    return true
  }

  play() {
    this.props.music.play()
      this.setState({
        isPlaying: true
      })
  }
  pause() {
    this.props.music.pause()
    this.setState({
      isPlaying: false
    })
  }
  toggleMode() {
    this.setState({
      isSingleCycle: !this.state.isSingleCycle
    })
  }
  playNext() {
    this.props.setSongInfoAndPlay()
    this.setState({
      isPlaying: true
    })
  }

  render() {
    let playOrPauseBtn = this.state.isPlaying ?
      <span className="icon-pause" onClick={this.pause}></span> :
      <span className="icon-play" onClick={this.play}></span>
    
    let playModeBtn = this.state.isSingleCycle ? 
      <span className="icon-single-cycle" onClick={this.toggleMode}></span> :
      <span className="icon-play-random" onClick={this.toggleMode}></span>

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
        <span className="icon-play-last" onClick={this.playNext}></span>
        {playOrPauseBtn}
        <span className="icon-play-next" onClick={this.playNext}></span>
        {playModeBtn}
      </div>
    )
  }

}