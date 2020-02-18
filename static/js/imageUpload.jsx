class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImgFile: null,
        }
    }

    imgFileSelectedHandler = event => {
        this.setState({
            selectedImgFile: event.target.files[0],
        })
    }

    fileUploadHandler = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedImgFile);

        fetch('/add_image', {
            method: 'POST',
            body: formData
        })
        .then((response)=> response.json())

        // imageUpload.jsx:29 Error SyntaxError: Unexpected token A in JSON at position 0
        .then((result)=> {
            console.log('Sucess', result);
        })
        .catch((error)=> {
            console.error('Error', error);
        });
    };


    render() {
    return (
    <div className="Image">
        <input type="file" onChange={this.imgFileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
    </div>
    );
    }
}

ReactDOM.render(
    <ImageUpload />,
    document.getElementById("root")
 );