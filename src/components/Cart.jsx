import React, {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useCart} from '../contexts/CartContext'
import { Plus, Dash } from 'react-bootstrap-icons';
import axios from 'axios';

const Cart = (props) => {
	const [totalAmount, setTotalAmount] = useState(0);
	const {
        state: {cart},
		dispatch
      } = useCart([])
	  useEffect(() => {
		
		if(cart && cart.length > 0){
			let i = 0
			for(let a=0;a<cart.length;a++){
				i = i + (cart[a].price * cart[a].quantity)
			}
			setTotalAmount(i)
		}else{
			setTotalAmount(0)
		}

	},[cart])

	 const checkout = async () => {
			await dispatch({type: 'checkout'})
			
			axios.get('http://localhost:3004/grocery')
			.then(res => {
				props.setProducts(res.data);
			})
			
	}

	
        return (
			<React.Fragment>
				<h2>Cart</h2>
				
				{cart && cart.map((product) => (
					<Row  key={product.id} className="mt-4">
						<Col xs={4}>
							<img src={product.image_url} style={{ width: '100%' }} alt=""></img>
						</Col>
						<Col xs={8}>
							{product.productName}
							<div>
								${product.price * product.quantity}
							</div>
							<div>
								<Dash onClick={() => dispatch({type: 'removeProduct', product: product})} />
									{product.quantity}
								<Plus onClick={() => dispatch({type: 'addProduct', product: product})}/>
							</div>
						</Col>
					</Row>
				))}

				<Button className="mt-4"  onClick={() => checkout()}>CHECKOUT: ${totalAmount}</Button>
			</React.Fragment>
        )
    
}

export default Cart