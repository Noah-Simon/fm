export default function getUrl(url) {
  return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onload = function() {
          if (xhr.status===200 || xhr.status===304) {
            console.log(JSON.parse(xhr.responseText))
              resolve(xhr.responseText)
          } else {
              reject(new Error(xhr.statusText))
          }
      }
      xhr.onerror = function() {
          reject(new Error(xhr.statusText))
      }
      xhr.send()
  })
}