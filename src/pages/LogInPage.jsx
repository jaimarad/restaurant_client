import { Container, Row, Col } from 'react-bootstrap'
import EmailSignIn from '../components/EmailSignIn/EmailSignIn'
import GoogleSignIn from '../components/GoogleSignIn/GoogleSignIn'
const LoginPage = () => {

	return (

		<Container>

			<Row>

				<Col md={{ offset: 3, span: 6 }}>

					<h1>Sign In</h1>

					<hr />

					<EmailSignIn />
					<GoogleSignIn />

				</Col>
			</Row>

		</Container>
	)
}

export default LoginPage