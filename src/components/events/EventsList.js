import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bulma/sass/utilities/_all.sass";
// import "bulma/sass/components/card.sass";
// import "bulma/sass/elements/button.sass"
import "bulma/css/bulma.css"




export default class EventsList extends Component {



    render() {
        return (
            <React.Fragment>
                <section className="hero">
                <div className="hero-body">
                    <h1>Events</h1></div>
                </section>
                <div className="events">
                    <div className="columns">
                        <button type="button" onClick={() => this.props.history.push("/events/new")}>Add a New Event</button>
                    </div>
                    <div className="columns">
                        {
                            this.props.events.map(event => {
                                return <div key={event.id} className="card card--event column">
                                    <header className="card-header">
                                        <h3 className="card-header-title is-link">{event.name}</h3>
                                    </header>

                                    <div className="card-content">
                                        <div className="content">
                                            <p>{event.location}</p>
                                            <p>{event.date}</p>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className={`delete--${event.id} card-footer-item button is-link`}
                                            onClick={() => this.props.delete("events", `${event.id}`)}>Delete</button>
                                        <button className={`edit--${event.id} card-footer-item button is-link`}
                                            onClick={() => this.props.history.push(`/events/edit/${event.id}`)}>Edit</button>
                                    </div>
                                </div>

                            })

                        }
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

