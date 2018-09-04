import React, { Component } from 'react';
import NewsCard from "./NewsCard"

export default class NewsList extends Component {
    render () {
        // JavaScript stuff can be writen here!
        return (
            <React.Fragment>
                <h2 className="header">News Articles</h2>
                <div>
                <button type="button" className="add-new-article"
                    onClick={() => {this.props.history.push("/news/add")}}>Write a post</button>
                </div>
                <section className="news">
                {
                    this.props.allNews.map(news => 
                        <NewsCard key={news.id} news={news} {...this.props} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}