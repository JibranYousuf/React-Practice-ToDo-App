import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid'; 

class AddProject extends Component {
    constructor(){
        super();
        this.state ={
            newProject:{}
        }
    }



    static defaultProps = {
        categories: ['Web Design', 'Web Dev', 'Mobile Dev']
    }

handleSubmit(e){
    if(this.refs.title.value === ''){
        alert('Title is required');
    } else {
        this.setState({newProject:{
            id: uuid.v1(),
            title: this.refs.title.value,
            category: this.refs.category.value
        }}, function(){
            // console.log(this.state)
        this.props.addProject(this.state.newProject);
        })
    }
    e.preventDefault();
}

    render() {
        let categoriesOptions = this.props.categories.map(category =>{
            return <option key={category} value={category}>{category}</option>
        })
        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Title</label><br/>
                        <input type="text" ref="title" />
                    </div>
                    <div>
                        <label>Category</label><br />
                        <select ref="category">
                        {categoriesOptions}
                        </select>
                    </div>
                    <br/>
                    <input type="submit" value="Submit"/>
                    </form>
            </div>
        );
    }
}

AddProject.propTypes = {
    categories: PropTypes.array,
    addProject: PropTypes.func
  }

export default AddProject;
