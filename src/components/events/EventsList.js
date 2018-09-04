import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"


export default class EventsList extends Component {



    render () {
        return (
            <React.Fragment>
                <h1>Events</h1>
                    <div className="events">
                    <button type="button" onClick={()=> this.props.history.push("/events/new")}>Add a New Event</button>
                        {
                            this.props.events.map(event => {
                             return <div key={event.id} className="card card--event">
                                <div className="card-body">
                                    <h3 className="class-title">{event.name}</h3>
                                    <p>{event.location}</p>
                                    <p>{event.date}</p>
                                    <button className={`delete--${event.id}`} 
                                    onClick={() => this.props.delete("events", `${event.id}`)}>Delete</button>
                                    <button className={`edit--${event.id}`}
                                    onClick={() => this.props.history.push(`/events/edit/${event.id}`)}>Edit</button>
                                </div>
                             </div>

                            })

                        }
                    </div>
            </React.Fragment>

        )
    }
}

