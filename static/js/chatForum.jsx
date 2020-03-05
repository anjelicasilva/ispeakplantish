 // http://0.0.0.0:5000/
 const socket = io.connect('http://' + document.domain + ':' + location.port)

 // broadcast a message
 socket.on('connect', function() {
    console.log("Socket connected")
   socket.emit( 'my event', {
     data: 'User Connected!'
   })

})

   const form = $('form').on('submit', function(e) {
     e.preventDefault()
     let username = $('input.username').val()
     let message = $('input.message').val()
       socket.emit('my event', {
           username: username,
           message: message,
       })
       //empty the message field, focus automatically so no need to move cursor
       $('input.message').val('').focus()
   })

     // capture message
     socket.on('my response', function(msg) {
         if(typeof msg.username !== 'undefined') {
             $('h1').remove()
             $('div.message_holder').append('<div class="msg_bbl"><b style="color: #000">'+msg.username+'</b> '+msg.message+' </div>')
         }
     })

class ChatForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
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
            username: this.state.username,
            message: this.state.message,
        }
        socket.emit('message', chatData) 
    }

    render() {
        return (
            <div>
                <div className="text-center well"><b>ISpeakPlantish Forum Chat</b></div>
                <div className="container">
                    <div className="col-sm-8">
                        <div className="no_message">
                        <h1 style={{ color: 'grey' }}>No messages yet..</h1>
                        <div className="message_holder"></div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <form >
                            <b>Type your message below <span className="glyphicon glyphicon-arrow-down"></span></b>
                            <div className="clearfix" style={{ margin: 5 }}></div>
                            <input type="text" className="username form-control" placeholder="User Name" name="username" onChange={this.handleForumChatInput}></input>
                            <div style={{ padding: 5}}></div>
                            <input type="text" className="message form-control" placeholder="Messages" name="message" onChange={this.handleForumChatInput}></input>
                            <div style={{ padding: 5 }}></div>
                            <button type="submit" className="btn btn-success btn-block" onClick={this.sendChatMessage}><span className="glyphicon glyphicon-send" ></span> Send</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}