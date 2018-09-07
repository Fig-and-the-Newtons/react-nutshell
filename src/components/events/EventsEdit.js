import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default class EventsEdit extends Component {

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

    editTheEvent = evt => {
        evt.preventDefault();
        const updatedEvent = {
            name: this.state.name,
            location: this.state.location,
            date: this.state.date
        }
        const correctEventId = parseInt(this.props.match.params.eventId, 0);

        this.props.patch("events", updatedEvent, correctEventId).then(() => this.props.history.push("/events"))

    }
    componentDidMount(){
        const event = this.props.events.find(a => a.id === parseInt(this.props.match.params.eventId, 0)) || {}
        this.setState(event)


    }


    render() {
        return(
            <React.Fragment>
                <form className="events-form">
                <div className="columns">

                <div className="form-group column is-4">
                    <label htmlFor="eventName">Event</label>
                    <input type="text" required="true"
                           className="form-control input is-rounded is-primary"
                           onChange={this.handleFieldChange}
                           id="name"
                           placeholder="Event name"
                           defaultValue={this.state.name} />
                </div></div>
                <div className="columns">

                <div className="form-group column is-4">
                        <label htmlFor="eventLocation">Location</label>
                        <input type="text" required="true"
                               className="form-control input is-rounded is-primary"
                               onChange={this.handleFieldChange}
                               id="location"
                               placeholder="Location" 
                               defaultValue={this.state.location}/></div></div>
                <div className="columns">

                <div className="form-group column is-4">
                        <label htmlFor="eventDate">Date</label>
                        <input type="date" required="true"
                               className="form-control input is-rounded is-primary"
                               onChange={this.handleFieldChange}
                               id="date"
                               defaultValue={this.state.date}/>
                    </div></div>
                    <button type="submit" onClick={this.editTheEvent} className="btn btn-primary">Save</button>

                </form>
            </React.Fragment>

        )
    }
}