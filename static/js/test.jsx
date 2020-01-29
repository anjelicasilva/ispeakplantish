"use strict";

console.log('Hi')

class Test extends React.Component {
    render() {
        return (<h1>test test test</h1>);
    }
}

ReactDOM.render(
    <Test />, 
    document.getElementById("root")
);