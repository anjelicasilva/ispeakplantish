// // document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('http://' + document.domain + ':' + location.port)

    let currentUserName

    $.get('/api/forum', (response) => {
        let currentUserName = response.current_user_name
        const rooms = response.rooms});

    let room = "General Discussion";
    joinRoom("General Discussion");


    // Display incoming messages
    socket.on('message', data => {
        const p = document.createElement('p');
        const span_username = document.createElement('span');
        const span_timestamp = document.createElement('span');
        const br = document.createElement('br');

        if (data.current_user_name) {
            span_username.innerHTML = data.current_user_name;
            span_timestamp.innerHTML = data.time_stamp;
            p.innerHTML = span_username.outerHTML + br.outerHTML + data.msg 
                        + br.outerHTML + span_timestamp.outerHTML;
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
// })




// document.addEventListener('DOMContentLoaded', () => {
    // Make 'enter' key submit message
    let msg = document.querySelector('#user_message');
    msg.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#send_message').click();
        }
    })

// })






class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: null,
            currentUserName: null,
            currentUserId: null,
            message: null,
        }
    }

    handleForumChatInput = changeEvent => {
        this.setState({
          [changeEvent.target.name]: changeEvent.target.value
        });
      }


    sendChatMessage = chatForumSubmitEvent => {
        chatForumSubmitEvent.preventDefault();
        let chatData = { 
            currentUserName: this.state.currentUserName,
            msg: this.state.message,
        }
        socket.emit('message', chatData) 
    }


    componentDidMount() {
        this.fetchForumInfo();
     }

    async fetchForumInfo() {
        // fetch list of information for current user and forum
        const forumResponse = await fetch(`/api/forum`);
        const forumJson = await forumResponse.json();
        
        this.setState({
            currentUserName: this.props.renderCurrentUserFirstName(),
            currentUserId: this.props.renderCurrentUserId(),
            allRooms: forumJson.rooms,
        }, () => console.log('current state', this.state));
    }

    joinRoom = (room) => {
        socket.emit('join', {'currentUserName': this.state.currentUserName,
                    'room': room});
        // Clear message area
        $('#display-message-section').val('')
        // document.querySelector('#display-message-section').innerHTML = ''
        // Autofocus on text box
    //     document.querySelector('#user_message').focus();
        $('#user_message').focus()
    }


    renderRooms = () => {
        const allRoomsList = []
        for (const room of this.state.allRooms) {
            allRoomsList.push(<p key={room} className="select-room" onClick={this.joinRoom(room)}>{room}</p>)
        }
        return allRoomsList
    }

    render() {
        const currentUser = this.state.currentUserName;
        console.log('who is the current user?',currentUser)
        if (currentUser) {
            return (
                <div>
                    {/* Navigation Bar */}
                    <nav>
                    </nav>

                    <div id="main-section">

                        {/* Room selection */}
                        <nav id="sidebar">
                            <h4>ROOMS</h4>
                            {this.renderRooms()}
                        </nav>

                        {/* Message Area */}
                        <div id="rightside-panel">

                            {/* Display message */}
                            <div id="display-message-section">
                            </div>

                            {/* Input message */}
                            <div id="input-area">
                                <input type="text" id="user_message" name="message" placeholder="Type Here..." autoComplete="off" onChange={this.handleForumChatInput}></input>
                                <button type="button" id="send_message" onClick={this.sendChatMessage}>SEND</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return ('Loading...')
        } 
    }
}