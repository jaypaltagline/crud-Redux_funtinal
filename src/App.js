import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AddForm from './components/addForm'
import EditForm from './components/editForm'

class App extends React.Component 
{
  render()
  {
    return (
      <div className="App">
      <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route path='/add' component={AddForm} />
          <Route path='/edit/:id' component={EditForm} />         
       </Switch>
    </div>
    );
  }
}
export default App;
