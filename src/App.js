import './App.css';
import Container from 'react-bootstrap/Container';
import {CartProvider} from './contexts/CartContext'
import Routes from './routes/Routes'
import Menu from './components/Menu'
import {
	BrowserRouter as Router,
  } from "react-router-dom";

function App() {
  return (
		<CartProvider>
			<Router>
				<Menu />
				<Container fluid className="mt-4">
					<Routes />				
				</Container>
			</Router>
		</CartProvider>
  );
}

export default App;
