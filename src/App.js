import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import LoginForm from './components/LoginForm';

class App extends React.Component 
{

  
  render()
  {
    return (
      <div className="App">
       <Switch>
          <Route exact path='/' component={LoginForm} />         
        
        
       </Switch>

      </div>
    );
  }
}
export default App;
