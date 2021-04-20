import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useCart} from '../contexts/CartContext'
import Heart from '../static/heart.svg';
import HeartRed from '../static/heart-red.png';
import axios from 'axios';

const ProductCard = (props) => {
	const {dispatch} = useCart()
	const [product, setProduct] = useState(props.product)
	useEffect(() => {
		
	},[props.product])

	function toggleFavorite(){
		product.favorite === "1"? product.favorite = "0": product.favorite = "1"
		axios.patch(`http://localhost:3004/grocery/${product.id}`, {...product 
		})
		.then(res => {
			let updatedProduct = {...product}
			setProduct(updatedProduct)
		})

	}

	let icon = ""
	if(product.favorite === "1"){
		 icon = <img src={HeartRed} alt="favorite" onClick={() => toggleFavorite()}></img>
	}else{
		 icon = <img src={Heart} alt="favorite" onClick={() => toggleFavorite()}></img>
	}

    return (
        <Card className="mt-4" style={{ width: '18rem' }}>
			<Card.Img variant="top"  src={product.image_url} />
			<Card.Body>
				<Card.Title>{product.productName} ${product.price}</Card.Title>
				<Card.Text>
					{product.productDescription}
				</Card.Text>
				<Row>
					<Col>
						Stock: {props.product.stock}
					</Col>
					<Col>
						<Button variant="primary" onClick={() => dispatch({type: 'addProduct', product: product})}>+ Add</Button>
					</Col>
				</Row>
			</Card.Body>
			<div className="heartFavorite" >
				{icon}
			</div>
		</Card>
    )
    
}

export default ProductCard