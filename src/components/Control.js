import React from 'react'

import './Control.css'

export default function Control(props) {
  const playOrPauseBtn = !props.isPlaying ?
    <span className="icon-play" onClick={props.play}></span> : 
    <span className="icon-pause" onClick={props.pause}></span>
  return (
    <div className="Control iconfont">
      <span className="icon-play-last" onClick={props.playNext}></span>
      {playOrPauseBtn}
      <span className="icon-play-next" onClick={props.playNext}></span>
    </div>
  )
}