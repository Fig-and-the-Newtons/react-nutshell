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
                completed: this.state.completed,
                userId: this.props.user.id
            }

            this.props.post("tasks", task).then(() => this.props.history.push("/tasks"))
        }
    }

    cancelNewTask = () => {
        this.props.history.push("/tasks")
    }

    render() {
        return (
            <React.Fragment>
                <div className="tasksFormArea tasks d-flex justify-content-center">
                    <form className="taskForm d-flex flex-column justify-content-center">
                        <div className="task-h1">Add a new task!</div>
                        <div className="tasksForm-group">
                            <input type="date" required="true"
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
                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={this.constructNewTask} className="saveTaskbtn btn btn-success tasksForm-group">Submit</button>
                            <button type="cancel" onClick={this.cancelNewTask} className="cancelTaskbtn btn btn-danger tasksForm-group">Cancel</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}