import React, { Component } from 'react';
import axios from 'axios';
import './selecteditem.css';
import { Link } from 'react-router-dom';

class selectedItem extends Component{
  constructor(props){
    super(props);
    this.state={
      itemDetail:{},
      message: "",
    }
  }


  handleDelete = async (event)=>{
    if (window.confirm(`Are you Sure, You want to Delete "${this.state.itemDetail.name}"?`)){

      const homeAPI = `${window.apiHost}/api/items/${this.state.itemDetail.id}`;
      await axios.delete(homeAPI,{})
      console.log(await axios.delete(homeAPI,{}));
      document.getElementById('items_main_id').innerHTML = 'Item Deleted Successfully! Redirecting to Home Page'
      document.getElementById("items_main_id").style.cssText = 'background-color: white;color:#c0eb34;font-size: 22px;padding-left: 397px;'

      setTimeout(()=>{
        this.props.history.push('/')
      }, 2000)}

  }

  componentDidMount(){
    const itno = this.props.match.params.itno;
    const itemAPI = `${window.apiHost}/api/items/${itno}`;
    axios.get(itemAPI).then(res => {
      this.setState({itemDetail: res.data.result.item_detail})
    })
  }



  render(){

    return(
      <>
        <div className="outer_div">
          <div className="title">
            <h1>Welcome to "Sadguru's Amrit-Tulya-Tea Shop"</h1>
          </div>
          <div className="items_main" id="items_main_id">
            <div className="heading"><h1>Details of selected item</h1></div>
            <div className="image"> <img src={this.state.itemDetail.image} alt="Card"/></div>
            <div className="Name"><h2>Name: {this.state.itemDetail.name}</h2>
              <h3>Price: Rs {this.state.itemDetail.price}</h3>
          </div>

            <div className="description"><h3>Description</h3><br></br><h5>{this.state.itemDetail.description}</h5><Link to=''>
              <button type="button" className="btn btn-outline-success back">Go Back</button></Link><button type="button" className="btn btn-danger delete" onClick={this.handleDelete}>Delete</button>
              <Link to={`/items/${this.state.itemDetail.id}/update/`}><button type="button" className="btn btn-primary update" >update</button></Link>
            </div>

          </div>


        </div>
      </>
    )
    }
}




export default selectedItem;
