import React, { Component } from 'react';
import axios from 'axios';
import './updateitem.css';
import { Link } from 'react-router-dom';

class updateItem extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      image: '',
      message: "",
      id: '',
      image_to_display: '',

    }
  }

  componentDidMount(){
    const itno = this.props.match.params.itno;
    const itemAPI = `${window.apiHost}/api/items/${itno}`;
    axios.get(itemAPI).then(res => {
      this.setState({
        name: res.data.result.item_detail.name,
        description: res.data.result.item_detail.description,
        price: res.data.result.item_detail.price,
        image_to_display: res.data.result.item_detail.image,
        id: res.data.result.item_detail.id,})
    })
  }

  onImageChange= (event)=>{

    this.setState({
      'image': event.target.files[0],
    })
    if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({image_to_display: e.target.result});
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  }



  handleChange= (event)=>{
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleUpdate = async (event)=>{
    console.log('handle update');
    const itno = this.props.match.params.itno;
    const itemAPI = `${window.apiHost}/api/items/${itno}/`;
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('name', this.state.name);
    form_data.append('description', this.state.description);
    form_data.append('price', this.state.price);
    form_data.append('image', this.state.image, this.state.image.name);
    await axios.put(itemAPI,
      form_data, {headers: {
        'content-type': 'multipart/form-data'
      }}).then(res => {
      this.setState({
        name: res.data.result.item_detail.name,
        description: res.data.result.item_detail.description,
        price: res.data.result.item_detail.price,
        image: res.data.result.item_detail.image,
        id: res.data.result.item_detail.id,
        message: res.data.result.message})})

    document.getElementById('update_message').innerHTML = this.state.message
    document.getElementById('update_message').style.cssText = "text-align: center;background-color: #427ef5;padding-top: 10px;padding-bottom: 10px;font-family: 'Balsamiq Sans', cursive;color: white;"
    setTimeout(()=>{
      this.props.history.push(`/items/${this.state.id}`)
    }, 2000)

}

  render(){
    return(

      <div className="main_div">
              <div className="title">
                <h1>Welcome to "Sadguru's Amrit-Tulya-Tea Shop"</h1>
              </div>
              <div className="container" id="update_message"></div>
              <div className='container con_class'>
                <form onSubmit={this.handleUpdate} encType="multipart/form-data" className='update_form'>
                  <h2>Update Form</h2>
                  <div className="body">
                    <div className="name"><p>Name:</p><input type="text" value={this.state.name} onChange={this.handleChange} name="name" required></input></div ><br></br>
                    <div className="desc"><p>Description: </p><textarea type="textarea" value={this.state.description} onChange={this.handleChange} name="description" required></textarea></div><br></br>
                    <div className="price"><p>Price: </p><input type="text" value={this.state.price} onChange={this.handleChange} name="price" required></input></div><br></br>
                    <div className="img"><p>Image: </p><input type="file" className="form-control" id="image"   onChange={(e)=>this.onImageChange(e)} name="image"  required/></div>
                    <div className="_ext_img">Current Image<img src={this.state.image_to_display} alt="Card"/></div>
                  </div>
                  <div className="footer">
                    <button type="submit" className="btn btn-success update" >Update</button>
                    <Link to={`/items/${this.state.id}/`}>
                      <button type="button" className="btn btn-danger" >Cancel</button>
                    </Link>
                  </div>
                </form>
              </div>


    </div>

    )
  }
}

export default updateItem;
