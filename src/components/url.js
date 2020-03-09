import React, { Component } from "react"; 

class UrlData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:null
        }
    }
    
    componentDidMount(){
      //  console.log('this.props', this.props)
        let id = this.props.match.param.post_id
        this.setState({
            id: id
        })
    }
  render() {
    return (
     <div>
  <h3>{this.state.id}</h3>
     </div>
    );
  }
}

export default UrlData;