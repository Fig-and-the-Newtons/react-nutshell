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
                    <CardTitle className="news-title">{this.props.news.title}</CardTitle>
                    <hr/>
                    <CardText>{this.props.news.article}</CardText>
                    <CardText>Posted: {this.props.news.date}</CardText>
                    <CardLink href={this.props.news.link} className="news-link text-info">Read More</CardLink>
                    <div>
                    <Button onClick={this.deleteArticle} className="card-link delete-news-button">Delete</Button>
                    <Button onClick={() => this.props.history.push(`/news/edit/${this.props.news.id}`)}
                    className="card-link edit-news-button">Edit</Button>
                    </div>
                </Card>
            </div>
        )
    }
}


