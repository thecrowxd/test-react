import React, { useState, useEffect} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ProductCard from '../components/ProductCard'
import Cart from '../components/Cart'
import { useMediaQuery } from 'react-responsive'
import {withRouter} from 'react-router-dom';

const ProductsList = (props) => {
    
	const isMobile = useMediaQuery({ query: '(max-width: 414px)' })

	
	const [updateProducts, setUpdateProducts] = useState();
	const [products, setProducts] = useState();
   useEffect(() => {
	const fetchProducts = () => {
		let url = ''
		props.match.path === "/favorites" ?  url = 'http://localhost:3004/grocery?favorite=1': url = 'http://localhost:3004/grocery'
		
		axios.get(url)
		.then(res => {
			setProducts(res.data);
		})

	}
	
		fetchProducts()
        
      },[updateProducts, props.match.path]);

	  

        return (
        	  (isMobile)?(
                <Row>
                <Col sm={12}>
                    <h2>Product List</h2>
					<Row>
					{products && products.map((product) => (
						<Col key={product.id}>
							<ProductCard product={product} key={product.id} />
						</Col>
					))}
					</Row>
                </Col>
            </Row>
              ) :(
              <Row>
                <Col sm={9}>
                    <h2>Product List</h2>
					<Row>
					{products && products.map((product) => (
						<Col key={product.id}>
							<ProductCard product={product} key={product.id} />
						</Col>
					))}
					</Row>
                </Col>
                <Col sm={3}>
                    <Cart setUpdateProducts={setUpdateProducts} setProducts={setProducts} />
                </Col>
            </Row>) 
           
        )
    
}

export default withRouter(ProductsList)