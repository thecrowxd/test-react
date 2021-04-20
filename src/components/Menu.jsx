import React from "react";
import { Gift, Cart, Star } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">			
			<Nav className="ml-auto" style={{ 'flexDirection':"row"}}>
				<NavLink to="/">
					<Navbar.Text><Gift color="white" /> Product List</Navbar.Text>
				</NavLink>
				<NavLink to="/favorites">
					<Navbar.Text  className="ml-4"><Star color="white" /> Favorites</Navbar.Text>
				</NavLink>
				<NavLink to="/cart">
					<Navbar.Text className="d-sm-none ml-4"><Cart color="white" /> My Cart</Navbar.Text>
				</NavLink>
			</Nav>			
		</Navbar>
    )
}

export default Menu;