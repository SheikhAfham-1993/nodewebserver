console.log('Hello from the other side')


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageSuccess = document.querySelector('#messageSuccess')
const messageError = document.querySelector('#messageError')
const messageLoading = document.querySelector('#messageLoading')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = searchElement.value
    messageSuccess.textContent = ''
    messageError.textContent = ''
    messageLoading.textContent = 'Loading Please wait...'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLoading.textContent = ''
                messageError.textContent = data.error
                return console.log(data.error)
            }
            messageLoading.textContent = ''
            messageSuccess.textContent = data.Return_value
            console.log('Data is', data)
        })

    })

})