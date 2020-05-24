import React, { Component } from 'react';
import './home.css';
import ItemsList from '../itemsList/ItemsList';
import axios from 'axios';
import { connect } from 'react-redux';
import itemListAction from '../../actions/listItemsAction';
import { bindActionCreators } from 'redux';

class Home extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      image: '',
      productList: [],
      message: ""

    }
  }

  handleChange= (event)=>{
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFileUpload= (event)=>{

    this.setState({
      'image': event.target.files[0],
    })

  }

    handleSubmit = async (event)=>{
      const homeAPI = `${window.apiHost}/api/items/`;
      event.preventDefault();
      let form_data = new FormData();
      form_data.append('name', this.state.name);
      form_data.append('description', this.state.description);
      form_data.append('price', this.state.price);
      form_data.append('image', this.state.image, this.state.image.name);
      await axios.post(homeAPI,
        form_data, {headers: {
          'content-type': 'multipart/form-data'
        }}).then(res => {
        this.setState({productList: res.data.result.product_data, message: res.data.result.message,name: '',
        description: '',
        price: '',
        image: ' ',})
      })
      this.props.itemListAction(this.state.productList);
      document.getElementById('message_display').style.backgroundColor = '#427ef5';
      setTimeout(function(){
        if (document.getElementById("message_display")){
          document.getElementById("message_display").innerHTML = '';
          document.getElementById('message_display').style.backgroundColor = 'white';
        }
      this.setState({
        message:''
        });
        }.bind(this), 3000);

  }

  addingItemForm = (event)=>{
        document.getElementById('item_form').style.display = "block";
        document.getElementById('add_item_button').style.visibility = 'hidden';

    }

  cancelForm = (event)=>{
        document.getElementById('item_form').style.display = "none";
        document.getElementById('add_item_button').style.visibility = '';

    }

  render(){

    return(
      <>
        <div className="container home_main_css">
          <div className="heading">
            <h1>Welcome to "Sadguru's Amrit-Tulya-Tea Shop"</h1>
          </div>
          <div id="message_display">{this.state.message}</div>
          <button className="btn btn-primary lg" id='add_item_button' onClick={this.addingItemForm}>Add items</button>
          <div className="container form_cont" id="item_form">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} name="name" placeholder="Enter Item Name" required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea type='text' className="form-control" id="desc" value={this.state.description} onChange={this.handleChange} name="description" placeholder="Enter Description"  required />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input type="text" className="form-control" id="price" value={this.state.price} onChange={this.handleChange} name="price" placeholder="Enter Price" required />
              </div>
              <div className="form-group">
                <label>image:</label>
                <input type="file" className="form-control" id="image"   onChange={(e)=>this.handleFileUpload(e)} name="image" required />
              </div>
              <div className="button_div">
                <button type="submit" className="btn btn-primary">Add Item</button>
                <button  type="button" className="btn btn-danger cancel" onClick={this.cancelForm}>Cancel</button>
              </div>
            </form>
          </div>

        </div>
        <div>
          < ItemsList />
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return{
    freshItemList: state.itemListReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    itemListAction: itemListAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
