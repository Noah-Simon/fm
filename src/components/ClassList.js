import React from 'react'

import './ClassList.css'

export default function ClassList(props) {
  let classList = props.songsClassList.map((item, index) => {
    return (
      <li key={item.channel_id} 
          onClick={() => {
            return props.onPlayByList(item.channel_id)
          }}>
        {item.name}
      </li>
    )
  })
  return <ul className="ClassList">{classList}</ul>
}