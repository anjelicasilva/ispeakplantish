// The DOMContentLoaded event fires when the initial HTML document has 
// been completely loaded and parsed, without waiting for stylesheets, images, 
// and subframes to finish loading.

document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect(('https://' + document.domain + ':' + location.port));
    // const socket = io.connect(('https://' + document.domain + ':' + location.port), {transports: ['websocket']});


    // Retrieve username
    const currentUserName = document.querySelector('#get-username').innerHTML;
    // console.log('what is this?', currentUserName)


    let room = "General Discussion";
    joinRoom("General Discussion");
    
    // Display incoming messages
    socket.on('message', data => {
        const p = document.createElement('p');
        // p.classList.add("speech-bubble")
        const spanUsername = document.createElement('span');
        // spanUsername.classList.add("my-username")
        const spanTimestamp = document.createElement('span');
        spanTimestamp.classList.add("timestamp")
        const br = document.createElement('br');

        // console.log('check1', data.current_user_name)
        // console.log('check2', currentUserName)


        // if (data.current_user_name == currentUserName) {

        if (data.current_user_name == 'undefined') {
            // console.log('who is the current user?', data.current_user_name)
            p.classList.add("my-msg");
            spanUsername.classList.add("my-username");
            // spanUsername.setAttribute("class", "my-username");
            spanUsername.innerHTML = data.current_user_name;
            spanTimestamp.innerHTML = data.time_stamp;
            p.innerHTML = spanUsername.outerHTML + br.outerHTML + data.msg 
                        + br.outerHTML + spanTimestamp.outerHTML;
            document.querySelector('#display-message-section').append(p);
        
        } 
        
        else if (typeof data.current_user_name !== 'undefined') {
            // console.log('who is the guest?', data.current_user_name)
            p.setAttribute("class", "others-msg");
            spanUsername.setAttribute("class", "other-username");
            spanUsername.innerHTML = data.current_user_name;
            spanTimestamp.innerHTML = data.time_stamp;
            p.innerHTML = spanUsername.outerHTML + br.outerHTML + data.msg 
                        + br.outerHTML + spanTimestamp.outerHTML;
            document.querySelector('#display-message-section').append(p);

        
        
        } else {
            printSysMsg(data.msg)
        }
        
    });

    // Send message
    document.querySelector('#send_message').onclick = () => {
        socket.send({'msg': document.querySelector('#user_message').value,
                     'currentUserName': currentUserName,
                     'room': room});
        // Clear input area
        document.querySelector('#user_message').value = '';
    }

    // Room selection
    document.querySelectorAll('.select-room').forEach(p => {
        p.onclick = () => {
            let newRoom = p.innerHTML;
            if (newRoom === room) {
                msg = `You are already in ${room} room.`
                printSysMsg(msg);
            } else {
                leaveRoom(room);
                joinRoom(newRoom);
                room = newRoom;
            }
        }
    });



    //Exit Forum
    document.querySelector('#exit-chat-btn').onclick = () => {
            leaveRoom(room);
            window.location.href = 'http://ispeakplantish.com'
            }
    


    // Leave room
    function leaveRoom(room) {
        socket.emit('leave', 
                    {'currentUserName': currentUserName,
                    'room': room});
    }

    // Join room
    function joinRoom(room) {
        socket.emit('join', {'currentUserName': currentUserName,
                    'room': room});
        // Clear message area
        document.querySelector('#display-message-section').innerHTML = ''
        // Autofocus on text box
        document.querySelector('#user_message').focus();
    }

    // Print system message
    function printSysMsg(msg) {
        const p = document.createElement('p');
        p.innerHTML = msg;
        document.querySelector('#display-message-section').append(p);
    }
})