import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Cart, Star } from 'react-bootstrap-icons';
import ProductsList from './views/ProductsList'

function App() {
  return (
    <Router>
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
			<Link to="/">
				<Navbar.Brand>Product List</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<Link to="/favourites">
						<Nav.Link><Star color="white" /> Favourites</Nav.Link>
					</Link>
					<Nav.Link className="d-block d-sm-none"><Cart color="white" /> My Cart</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		<Container className="mt-4">
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/topics">
					<Topics />
				</Route>
				<Route path="/">
					<ProductsList />
				</Route>
			</Switch>
		</Container>
    </Router>
  );
}


function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default App;
