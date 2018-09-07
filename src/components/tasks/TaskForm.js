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
                <div className="tasksFormArea tasks d-flex justify-content-center">
                    <form className="taskForm d-flex flex-column justify-content-center">
                        <div className="task-h1">Add a new task!</div>
                        <div className="tasksForm-group">
                            <input type="text" required="true"
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="completionDate"
                                placeholder="Completion Date" />
                        </div>
                        <div className="tasksForm-group">
                            <input type="text" required="true"
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="title" placeholder="Task Title" />
                        </div>
                        <button type="submit" onClick={this.constructNewTask} className="btn btn-primary tasksForm-group">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}