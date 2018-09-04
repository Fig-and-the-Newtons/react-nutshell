import React, { Component } from "react"
// import { Link } from "react-router-dom"

export default class NewsCard extends Component {
    render() {
        return (
            <div key={this.props.news.id} className="card">
                <div className="card-body">
                    <div className="card-title">
        
                        <div key={this.props.news.id}>
                            <h3>{this.props.news.title}</h3>
                            <p>{this.props.news.article}</p>
                            <a href={this.props.news.link}>Read More</a>
                        </div>
                
                        {/* <button onClick={() => this.props.deletenews(this.props.news)
                            .then(() => this.props.history.push('/newss'))}
                            className="card-link">Release</button> */}
                        {/* <Link className="nav-link" to={`/newss/${this.props.news.id}`}>Details</Link>
                        <Link className="nav-link" to={`/newss/edit/${this.props.news.id}`}>Edit</Link> */}
                    </div>
                </div>
            </div>
        )
    }
}