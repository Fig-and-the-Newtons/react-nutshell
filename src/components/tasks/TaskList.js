import React, { Component } from "react"
import TaskCard from './TaskCard'
import './tasks.css'
export default class TaskList extends Component {
    //console.log("TaskList.js");
    
    render() {
        const filteredTasks = this.props.tasks.filter(task => task.completed !== true) || {}

        return (
            <React.Fragment>
                
                <div className="container d-flex justify-content-center">
                    <div className="taskDeck">
                        <div className="taskTitle container d-flex justify-content-center">
                            <h1 className="taskTile w-50 float-left">Task List</h1>
                            <button type="button" className="btn btn-success taskTile w-25 float-right" onClick={() => { this.props.history.push("/tasks/new")}}>New Task</button>
                        </div>
                        {
                            filteredTasks.map(task =>
                                <TaskCard key={task.id} task={task} {...this.props}/>
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}