import React, { Component } from "react"
import "./tasks.css"

export default class TaskForm extends Component {

    state = {
        completionDate: "",
        title: "",
        completed: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewTask = evt => {
        evt.preventDefault()
        if (this.state.title === "") {
            window.alert("Please enter a task")
        } else {
            const task = {
                completionDate: this.state.completionDate,
                title: this.state.title,
                completed: this.state.completed
            }

            this.props.post("tasks", task).then(() => this.props.history.push("/tasks"))
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="formArea tasks">
                    <form className="taskForm">
                        <div className="form-group">
                            <input type="text" required="true"
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="completionDate"
                                placeholder="Completion Date" />
                        </div>
                        <div className="form-group">
                            <input type="text" required="true"
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="title" placeholder="Task Title" />
                        </div>
                        <button type="submit" onClick={this.constructNewTask} className="btn btn-primary form-group">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}