console.log('Hello from the other side')


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageSuccess = document.querySelector('#messageSuccess')
const messageError = document.querySelector('#messageError')
const messageLoading = document.querySelector('#messageLoading')
const country = document.querySelector('#NameoftheCoutnry')
const city = document.querySelector('#NameoftheCity')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = searchElement.value

    country.textContent = ''
    city.textContent = ''
    messageSuccess.textContent = ''
    messageError.textContent = ''
    messageLoading.textContent = 'Loading Please wait...'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLoading.textContent = ''
                messageError.textContent = data.error
                return console.log(data.error)
            }
            messageLoading.textContent = ''
            messageSuccess.textContent = data.Return_value
            country.textContent = data.country
            city.textContent = data.name

            console.log('Data is', data)
        })

    })

})