import React, { Component } from 'react';
import uuid from 'uuid'; 
import Projects from './components/Projects';
import Todos from './components/Todos';
import AddProject  from './components/AddProject'
import PropTypes from 'prop-types';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos : []
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state)
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err)
      }
    })        
  }

  getProjects(){
    this.setState({
      projects: [
        {
          id:uuid.v1(),
          title: 'business website',
          category: 'Web Design'
        },
        {
          id:uuid.v1(),
          title: 'social app',
          category: 'Mobile Dev'
        },
        {
          id: uuid.v1(),
          title: 'ecom cart',
          category: 'Web Dev'
        }
      ]});
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

handleAddProject(project){
  let projects = this.state.projects;
  projects.push(project);
  this.setState({projects:projects});
}

handleDeleteProject(id){
  let projects = this.state.projects;
  let index = projects.findIndex(x => x.id === id);
  projects.splice(index, 1);
  this.setState({projects:projects});
}

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr/>
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
