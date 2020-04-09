let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error = newError('Error' + url_api)
                return callback(error, null)
            }
        }
    }
    xhttp.send()
}

fetchData(API, function (error1, data1) {
    if (error1) return console.log(error1)
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if (error2) return console.log(error2)
        fetchData(data2.origin.url, function (error3, date3) {
            if (error3) return console.log(error3)
            console.log(data1.info.count)
            console.log(data2.name)
            console.log(date3.dimension)
        })
    })
})
