export default function formatTime(t) {
  var tmpS = parseInt(t % 60)
  var tmpM = parseInt(t / 60)
  return (tmpM < 10 ? '0' + tmpM : tmpM ) + ' : ' + 
  (tmpS < 10 ? '0' + tmpS : tmpS)
}