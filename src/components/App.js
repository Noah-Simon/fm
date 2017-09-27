import React, { Component } from 'react'
import getUrl from '../utils/getUrl.js'
import './App.css'

import ClassList from './ClassList.js'
import Control from './Control.js'
import Header from './Header.js'
import SongInfo from './SongInfo.js'
import PlayDetail from './PlayDetail.js'

import {CHANNELS_URL, SONGS_URL, LRCS_URL} from './urls.js'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songsClassList : [],
      currentSongInfo : {},
      currentChannelId: 0,
      currentShow: 'MainInterface',
      lrc: ''
    }
    this.music = new Audio()
    window.music = this.music
    this.setSongInfoAndPlay = this.setSongInfoAndPlay.bind(this)
    this.getClassList = this.getClassList.bind(this)
    this.playByList = this.playByList.bind(this)
    this.setCurrenShow = this.setCurrenShow.bind(this)
    this.setSonglrc = this.setSonglrc.bind(this)
  }

  render() {
    const classList = (this.state.currentShow === 'ClassList') ?
     <ClassList songsClassList={this.state.songsClassList} onPlayByList={this.playByList}/>
     : null
    const songInfo = (this.state.currentShow === 'MainInterface') ? 
     <SongInfo songInfo={this.state.currentSongInfo}/>
     : null
    // const playDetail = (this.state.currentShow === 'MainInterface' ) ?
    //  <PlayDetail music={this.music}  lyric={this.state.lrc} /> 
    //  : null   为什么这样不行？
    const control = (this.state.currentShow !== 'ClassList') ? 
     <Control setSongInfoAndPlay={() => {this.setSongInfoAndPlay(this.state.currentChannelId)}}
      music={this.music} />
     : null

    return (
      <div className='App'>
        <Header currentShow={this.state.currentShow} onSetCurrentShow={this.setCurrenShow}
        currentSongInfo={this.state.currentSongInfo} />
        {classList}
        {songInfo}
        <PlayDetail music={this.music}  lyric={this.state.lrc} currentShow={this.state.currentShow}/> 
        {control}
      </div>
    )
  }

  componentDidMount() {
    /*1.获取分类列表
      2.随机获取该分类下的一首歌
    */
    this.getClassList().then((data) => {
      this.setState({
        currentChannelId: data[0].channel_id
      })
      this.setSongInfoAndPlay(this.state.currentChannelId)
    })
  }
  

  setCurrenShow(str) {
    this.setState(
      {currentShow: str}
    )
  }

  playByList(channelId) {
    this.setState({
      currentChannelId: channelId
    })
    this.setSongInfoAndPlay(channelId)
  }

  getClassList() {
    let p = getUrl(CHANNELS_URL)
    return p.then((data) => {
      this.setState({
        songsClassList: JSON.parse(data).channels
      })
      return JSON.parse(data).channels
    })
  }

  setSongInfoAndPlay(channelId) {
    //每次设置当前歌曲信息并播放后再获取歌词
    let p =  getUrl(SONGS_URL + channelId)
    p.then((data) => {
      this.setState({
        currentSongInfo: JSON.parse(data).song[0]
      })
      this.music.src = this.state.currentSongInfo.url
      this.music.play()
      return this.state.currentSongInfo.sid
    }).then((data) => {
      this.setSonglrc(data)
    })
  }

  setSonglrc(songSid) {
    let p = getUrl(LRCS_URL + songSid)
    p.then((data) => {
      this.setState({
        lrc: JSON.parse(data).lyric
      })
    })
  }
}

export default App;