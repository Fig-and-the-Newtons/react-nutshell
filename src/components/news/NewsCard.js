import React, { Component } from "react"
import { Card, Button, CardTitle, CardText, CardLink } from 'reactstrap';
// import "bulma/css/bulma.css"


export default class NewsCard extends Component {
    deleteArticle = () => {
        this.props.delete("news", this.props.news.id)
    }

    render() {
        return (

        <div>
            <Card body>
                <CardTitle>{this.props.news.title}</CardTitle>
                <CardText>{this.props.news.article}</CardText>
                <CardLink href={this.props.news.link}>Read More</CardLink>
                <Button onClick={this.deleteArticle} className="card-link">Delete</Button> 
                <Button onClick={() => this.props.history.push(`/news/edit/${this.props.news.id}`)}
                className="card-link">Edit</Button>
            </Card>
        </div>
            // <div className="card">
            //     <div className="card-body">
            //         <div className="card-title">
            //             <div>
            //                 <h3>{this.props.news.title}</h3>
            //                 <p>{this.props.news.article}</p>
            //                 <a href={this.props.news.link}>Read More</a>
            //                 <p>Created on: {this.props.news.date}</p>
            //             </div>
            //             <button onClick={this.deleteArticle}
            //                 className="card-link">Delete</button> 
            //             <button onClick={() => this.props.history.push(`/news/edit/${this.props.news.id}`)}
            //                 className="card-link">Edit</button> 
            //         </div>
            //     </div>
            // </div>
        )
    }
}


