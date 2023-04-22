import { useContext } from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

	const { user, logout } = useContext(AuthContext)

	return (
		<Navbar bg="dark" expand="md" variant="dark" className="mb-5">
			<Container>
				<Link to="/">
					<Navbar.Brand as="div">Restaurants App</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{user ?
							<>
								<Nav.Link as="div" onClick={logout}>Log out</Nav.Link>
								<Link to="/perfil">
									<Nav.Link as="div">Profile</Nav.Link>
								</Link>
							</>
							:
							<>
								<Link to="/signup">
									<Nav.Link as="div">Sign In</Nav.Link>
								</Link>
								<Link to="/signin">
									<Nav.Link as="div">Log In</Nav.Link>
								</Link>


							</>
						}

						<Nav.Link as="div">¡Hola, {!user ? 'invitad@' : user.name}!</Nav.Link>

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

