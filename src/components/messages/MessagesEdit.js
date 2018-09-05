import React, { Component } from "react"

export default class MessageForm extends Component {
    // Set initial state
    state = {
        message: ""
    }

    componentDidMount(){
        const message = this.props.messages.find(m => m.id === parseInt(this.props.match.params.messageId, 0)) || {}
        this.setState(message)
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    editThisAnimal = evt => {
        evt.preventDefault()
        const message = {
            message: this.state.message,
        }
        this.props.patch("messages", message, parseInt(this.props.match.params.messageId, 0)).then(() => this.props.history.push("/messages"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="messageForm">
                    <div className="form-group">
                        <label htmlFor="message">Edit Message</label>
                        <input type="text" required="true"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message"
                            defaultValue={this.state.message} />
                    </div>
                    <button type="submit" onClick={this.editThisAnimal} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}