console.log('Client side javascript file is loaded!')

const messageTwo = document.querySelector('#message-2')
const messageOne = document.querySelector('#message-1')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent ='⌛ Loading ⌛'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {    
            messageOne.textContent = '🌎 ' + data.location + ' 🌎'
            messageTwo.textContent = '☁ ' + data.forecast + '   🎈😀'
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})


})