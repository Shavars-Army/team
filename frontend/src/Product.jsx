import React from 'react';
const  Product = ({title, description, price, image})=> {
    return( <div>
        <img src={image} alt={title} width={'200px'} />
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{price}</p>
    </div>);
  }
  
  export default Product;
  