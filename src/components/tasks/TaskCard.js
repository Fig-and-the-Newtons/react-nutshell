import React, { Component } from "react"
import "./tasks.css"

export default class TaskCard extends Component {

    state = {
        task: {},
        edit: false,
    }

    handleEditClicked = () => {
        this.setState({
           edit: true,
        })
    }

    handleFieldChange = (whichOne, evt) => {
        const updateTask = this.state.task;
        const stateToChange = whichOne
        updateTask[stateToChange] = evt.target.value
        this.setState({updateTask})
    }

    constructNewTask = evt => {
        evt.preventDefault()
       
           const task = {
                completionDate: this.state.task.completionDate,
                title: this.state.task.title
           }
           this.props.patch("tasks", task, this.props.task.id)
           this.setState({edit:false});
    }

    cancelNewTask = () => {
        this.setState({
            task: {
                completionDate: this.props.task.completionDate,
                title: this.props.task.title,
            },
            edit:false
        });
    }

    componentDidMount = () => {
        const result = this.props.tasks.find(a => a.id === this.props.task.id) || {}

        const task = {
            ...result
        }

        this.setState({task})
    }

    render() {
        return (
            <div key={this.props.task.id} className="taskCard container d-flex justify-content-center m-md-3">
                {
                    (this.state.edit) ?
                        <div className="">
                            <button onClick={this.constructNewTask} className="btn btn-primary taskBtn">Save</button>
                            <br></br>
                            <button onClick={this.cancelNewTask} className="btn btn-danger taskBtn">Edit</button>
                        </div>

                    :
                        <button onClick={() => this.handleEditClicked()} className="btn btn-primary taskBtn">Edit</button>
                }
                <div className="card w-100">
                    <div className="card-header">
                        <div className="header-left w-50 d-flex justify-content-start">
                            <input onClick={() => this.props.patch("tasks", {completed: true}, this.props.task.id)} className="taskCheckbox" name="completed" type="checkbox"/>
                            <label className="task-h3">Complete</label>
                        </div>
                        
                        <div className="header-right w-50 d-flex justify-content-end">
                        {
                            (this.state.edit) ?
                                <input type="text" required="true" className="form-control" onChange={(evt)=>{this.handleFieldChange("completionDate", evt)}} id="completionDate" value={this.state.task.completionDate} />

                            :
                                <div className="task-h3">{this.props.task.completionDate}</div>  
                        }
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            (this.state.edit) ?
                                <input type="text" required="true" className="form-control" onChange={(evt)=>{this.handleFieldChange("title", evt)}} id="title" value={this.state.task.title} />
                            :
                                <div className="task-h3">{this.props.task.title}</div>  
                        }
                    </div>
                </div>
                <button onClick={() => this.props.delete("tasks", this.props.task.id)} className="btn btn-secondary taskBtn">Delete</button>
            </div>
        )
    }
}