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


    componentDidMount = () => {
        const task = this.props.tasks.find(a => a.id === this.props.task.id) || {}

        this.setState({task})
    }

    render() {
        return (
            <div key={this.props.task.id} className="taskCard container d-flex justify-content-center m-md-3">
                {
                    (this.state.edit) ?
                        <button onClick={this.constructNewTask} className="btn btn-primary taskBtn">Save</button>

                    :
                        <button onClick={() => this.handleEditClicked()} className="btn btn-primary taskBtn">Edit</button>
                }
                <div className="card w-75">
                    <div className="card-header">
                        <div className="header-left w-25 float-left">
                            <input onClick={() => this.props.patch("tasks", {completed: true}, this.props.task.id)} className="taskCheckbox" name="completed" type="checkbox"/>
                            <label>Complete</label>
                        </div>
                        
                        <div className="header-right w-25 float-right">
                        {
                            (this.state.edit) ?
                                <input type="text" required="true" className="form-control" onChange={(evt)=>{this.handleFieldChange("completionDate", evt)}} id="completionDate" value={this.state.task.completionDate} placeholder={this.props.task.completionDate} />

                            :
                                <h5>{this.props.task.completionDate}</h5>  
                        }
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            (this.state.edit) ?
                                <input type="text" required="true" className="form-control" onChange={(evt)=>{this.handleFieldChange("title", evt)}} id="title" value={this.state.task.title} placeholder={this.props.task.title} />
                            :
                                <h5>{this.props.task.title}</h5>  
                        }
                    </div>
                </div>
                <button onClick={() => this.props.delete("tasks", this.props.task.id)} className="btn btn-secondary taskBtn">Delete</button>
            </div>
        )
    }
}