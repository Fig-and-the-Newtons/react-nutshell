import React, { Component } from "react";


export default class EventsForm extends Component {

    state = {
        name: "",
        location: "",
        date: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewEvent = e => {
        e.preventDefault();
        if (this.state.name === "" || this.state.location === "") {
            window.alert("Please fill out the details of this event")
        } else {
            const newObject = {
                name: this.state.name,
                location: this.state.location,
                date: this.state.date,
                userId: this.props.user.id
            }
            this.props.post("events", newObject).then(() => this.props.history.push("/events"))
        }
    }

    render() {
        return(
            <React.Fragment>
                <h3>Add a New Event</h3>
                <form className="event-form">
                    <div className="form-group">
                        <label htmlFor="eventName">Event</label>
                        <input type="text" required="true"
                               className="form-control" id="name"
                               onChange={this.handleFieldChange}
                               placeholder="Event" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventLocation">Location</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="location"
                                placeholder="Location" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventDate">Date</label>
                        <input type="date" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="date"/>
                    </div>
                    <button type="submit" onClick={this.constructNewEvent} className="btn btn-primary">Submit</button>

                </form>
            </React.Fragment>
        )
    }
}