import React from 'react'

import './SongInfo.css'

export default function SongInfo(props) {
  return (
    <div className='SongInfo'>
      <img src={props.songInfo.picture} alt='' />
      <div className="title">{props.songInfo.title}</div>
      <div className="artist">{props.songInfo.artist}</div>
    </div>
  )
}