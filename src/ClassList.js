import React, { Component } from 'react'

import './ClassList.css'

export default class ClassList extends Component {
  constructor(props) {
    super(props)
    // this.playByList = this.playByList.bind(this)
  }
  // playByList(channelId) {
  //   this.props.onPlayByList(channelId)
  // }
  render() {
    let classList = this.props.songsClassList.map((item, index) => {
      return (
        <li key={item.channel_id} 
            onClick={() => {
              return this.props.onPlayByList(item.channel_id)
            }}>
          {item.name}
        </li>
      )
    })
    return <ul className="ClassList">{classList}</ul>
  }
}