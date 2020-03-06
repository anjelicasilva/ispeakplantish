// The DOMContentLoaded event fires when the initial HTML document has 
// been completely loaded and parsed, without waiting for stylesheets, images, 
// and subframes to finish loading.

document.addEventListener('DOMContentLoaded', () => {
    // Make 'enter' key submit message
    let msg = document.querySelector('#user_message');
    msg.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#send_message').click();
        }
    })

})