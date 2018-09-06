import React, { Component } from "react"

export default class AnimalEdit extends Component {
    // Set initial state
    state = {
        title: "",
        article: "",
        link: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

     edit = (event) => {
        event.preventDefault()
        const editedNews = {
            title: this.state.title,
            article: this.state.article,
            link: this.state.link
        }
        this.props.patch("news", editedNews, this.props.match.params.newsId)
        .then(() => this.props.history.push("/news"))
    }
    
    componentDidMount () {
        const newArticle = this.props.allNews.find(n => n.id === parseInt(this.props.match.params.newsId, 0)) || {}
        this.setState({
            title: newArticle.title,
            article: newArticle.article,
            link: newArticle.link
        })
    }

    render() {
    
        return (
            <React.Fragment>
                <form className="NewsForm">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="title"
                               defaultValue={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="article">Article</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="article" 
                               defaultValue={this.state.article} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Link</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="link" 
                               defaultValue={this.state.link} />
                    </div>
                    <button type="submit" onClick={this.edit} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}