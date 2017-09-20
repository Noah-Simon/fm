import React, { Component } from 'react'

import './PlayDetail.css'

import formatTime from './utilis/formatTime.js'

export default class PlayDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 0,
      progressBarWidth: '10%',
      lyricOffsetTop: '-3rem',
    }
    this.handleLyric = this.handleLyric.bind(this)
    this.slideLyric = this.slideLyric.bind(this)
  }
  
  componentDidMount() {
    this.props.music.addEventListener('loadedmetadata', () => {
      this.setState({
        duration: formatTime(this.props.music.duration)
      })
    })
    this.props.music.addEventListener('timeupdate', () => {
      this.slideLyric()
      this.setState({
        progressBarWidth: `${this.props.music.currentTime / this.props.music.duration * 100}%`,
        currentTime: formatTime(this.props.music.currentTime)
      })
    })
  }

  handleLyric(lyric) {
    var lyricLineArray = lyric.split('\n')
    var timeStampPattern = /\[\d{2}:\d{2}.\d{2}\]/g
    var time
    var text
    var tmpT
    var tmpS
    var objArr = []
    for(var i=0, l=lyricLineArray.length; i<l; i++) {
      var matchContent = lyricLineArray[i].match(timeStampPattern)
      if(matchContent) {
        //get the text of each line 
        tmpT = lyricLineArray[i].split(/\[.+\]/g)
        text = tmpT[tmpT.length-1] || '' 
        //get the time
        for(var j=0; j<matchContent.length; j++) {
          tmpS = matchContent[j].substring(1, matchContent[j].length - 1).split(':')
          time = (+tmpS[0]) * 60 + (+tmpS[1])
          objArr.push({
            'time': time,
            'text': text,
          })
        }   
      }
    }
  
    objArr.sort(function(a, b){
      return a.time-b.time
    })
    return objArr

  }

  slideLyric() {
    let arr = this.handleLyric(this.props.lyric)
    const ulElmt =  this.refs.lyric === undefined ? undefined : this.refs.lyric.childNodes
    for (var i = 0, l = arr.length; i < l; i++) {
      let prevNum = i > 0 ? i - 1: i
      if (this.props.music.currentTime > arr[i].time - 0.50) {
        this.setState({
          lyricOffsetTop: 1.5 + i * (-1.5) + 'rem'
        })
        if (ulElmt) {
          ulElmt[i].classList.add('target')
          ulElmt[prevNum].classList.remove('target')
        }
      }
    }
  }

  render() {
    const lyricArr = this.handleLyric(this.props.lyric)
    const lyricLiArr = lyricArr.map((item, index) => {
      return <li key={'line' + index}>{item.text}</li>
    })
    if (this.props.currentShow === 'ClassList') {
      return null
    }
    const cName = this.props.currentShow === 'Lyric' ? ' height15Rem' : ''
    return (
      <div className="PlayDetail">
        <div className={"container" + cName}>
          <ul className="lyric" ref="lyric" style={{top: this.state.lyricOffsetTop}}>
            {lyricLiArr}
          </ul>
        </div>
        <div className="PlayTime">
          <span className="current">{this.state.currentTime}</span>
          <span className="duration">{this.state.duration}</span>
        </div>
        <div className="durationBar"  ref= "durationBar" onClick={(e) => {
          const w = e.nativeEvent.offsetX / parseInt(getComputedStyle(this.refs.durationBar).width)
          this.props.music.currentTime = w * this.props.music.duration
        }}>
          <div className="progressBar" style={{width: this.state.progressBarWidth}}></div>
        </div>
      </div>
    )
  }
}

