# project-FM（音乐电台-个人学习作品）

### 音乐来自百度FM, 饥人谷API

[预览](https://noah-simon.github.io/fm/build/index.html)

## 功能：

1. 已实现：播放/暂停/切换音乐/快进/快退/电台分类/滚动歌词
2. 未实现：切换播放模式/喜欢/调节音量/界面切换
3. 未实现功能思路：

 - 当用户点击喜欢时把音乐信息存到localstorage中，每次打开页面时读取localstorage中数据

## 技术

- 基础代码由react完成

  组件结构为：
   - App
     - Header
     - ClassList
     - SongInfo
     - PlayDetail
     - Control
- Promise对象实现的 Ajax 操作

- (ES6)Promise包装了一个音乐加载的异步操作。采用链式的then方法，指定一组按照次序调用的回调函数：通过Ajax获取当前电台音乐，状态为resolve时执行第一个resolve回调函数（渲染音乐信息并返回当前音乐sid），待状态为resolve后，执行把第二个resolve回调函数（前一个resolve回调函数的返回值作为参数，通过Ajax获取当前音乐歌词）待状态为resolve后，渲染歌词

- HTML5媒体元素Audio类型：创建Audio对象audioObject，调用audioObject.play()播放音乐，调用audioObject.pause()暂停音乐，‘ended’监听音乐播放结束，当currentTime更新时触发timeupdate事件（以此事件做滚动歌词功能）

## 界面

- 封面

![image](./img/1.png)


- 歌词

![image](./img/2.png)

* 所有电台

![image](./img/3.png)

