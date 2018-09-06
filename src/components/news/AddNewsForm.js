import React, { Component } from "react"

export default class NewsForm extends Component {

    state = {
        title: "",
        article: "",
        link: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    constructNewArticle = evt => {
        evt.preventDefault()
        if (this.state.name === "" || this.state.article === "" || this.state.link === "") {
            alert("Please fill out all fields")
        } else {
            const article = {
                title: this.state.title,
                article: this.state.article,
                link: this.state.link,
                date: Date(Date.now()),
                userId: this.props.user.id
            }

            this.props.post("news", article).then(() => this.props.history.push("/news"))
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className="newsForm">
                    <div className="form-group">
                        <label htmlFor="title">Article Title</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="title"
                               placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="article">Article</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="article" placeholder="Article" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Link to full new article here</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="link" placeholder="Link" />
                    </div>
                    <button type="submit" onClick={this.constructNewArticle} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}