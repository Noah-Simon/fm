export default function handleLyric(lyric) {
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