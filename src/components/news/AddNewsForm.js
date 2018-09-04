import React, { Component } from "react"

export default class NewsForm extends Component {
    // Set initial state
    state = {
        title: "",
        article: "",
        link: ""
    }

    loadUserIDFromSS = () => {
        let stringifiedUser = sessionStorage.getItem("credentials");
        let parsedUser = JSON.parse(stringifiedUser);
        return parsedUser.userNameExists.id
     }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewArticle = evt => {
        evt.preventDefault()
        if (this.state.name === "" || this.state.article === "") {
            window.alert("Please fill out all fields")
        } else {
            const article = {
                title: this.state.title,
                article: this.state.article,
                link: this.state.link,
                userId: this.loadUserIDFromSS()
            
            }

            // Create the animal and redirect user to animal list
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