import React, { Component } from 'react';
import NewsCard from "./NewsCard"
import { Button } from 'reactstrap';
import "./News.css"


export default class NewsList extends Component {
    
    render () {
        return (
            <React.Fragment>
                <h2 className="header">News Articles</h2>
                <div>
                <Button type="button" color="info" className="add-new-article"
                    onClick={() => {this.props.history.push("/news/add")}}>Write a post</Button>
                </div>
                <section className="news">
                {
                    this.props.allNews.map(news => {
                        return <NewsCard key={news.id} news={news} {...this.props} />
                    })
                }
                </section>
            </React.Fragment>
        )
    }
}