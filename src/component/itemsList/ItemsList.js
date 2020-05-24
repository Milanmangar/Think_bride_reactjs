import React, { Component } from 'react';
import './itemslist.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import itemListAction from '../../actions/listItemsAction';
import { bindActionCreators } from 'redux';


class ItemsList extends Component{

  constructor(props){
  super(props);
  this.state = {
    productList: []
  }
  }

  con

  async componentDidMount(){
    const homeAPI = `${window.apiHost}/api/items/`;
    await axios.get(homeAPI).then(res => {
      this.setState({productList: res.data.result.product_data})
    })
    this.props.itemListAction(this.state.productList);
  }


  render(){


    const products = this.props.productList.map((product, i)=>{
      return(

          <div className="card_style" key={i}>
            <div className="card_header">
              {product.name}
            </div>
            <Link to={`/items/${product.id}`}>
              <img className="card_image" src={product.image} alt="Card"/>
            </Link>
            <div className="card_footer">
              <p className="card_text">{product.description}</p>
              Rs. {product.price}
            </div>
          </div>

      )
    }
  )



    return(
      <div className="item_list_main">
        {products}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    productList: state.itemListReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    itemListAction: itemListAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
