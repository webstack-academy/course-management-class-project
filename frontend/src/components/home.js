import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

class HomeComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      showLoginModal: false,
      showRegistrationModal: false,
      datoEmail: '',
      datoPassword: '',
      datoUsername:'',
    }
  }

  login = async () => {
    try{
    const data = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: this.state.datoEmail,
        password: this.state.datoPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsedResponse = await data.json()

    if (data.status !== 200) {
      alert(parsedResponse.msg)
    } else {
      localStorage.setItem('token', parsedResponse.token)
    }

  } catch (e){
      console.log(e)
  }
  }

  registrati = async () => {
    try {
      const data = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email: this.state.datoEmail,
            password: this.state.datoPassword,
            confirm_password: this.state.datoPassword,
            username: this.state.datoUsername,
            name: 'test'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await data.json()

      if (data.status !== 200) {
        alert(parsedResponse.msg)
      } else {
        localStorage.setItem('token', parsedResponse.token)
      }

  } catch (e) {
    console.log(e)
  }

  }

  render() {
    const handleShowLoginModal = () => this.setState({ showLoginModal: true })
    const handleCloseLoginModal = () => this.setState({ showLoginModal: false })

    const handleCloseRegistrationModal = () => this.setState({ showRegistrationModal: false })
    const handleShowRegistrationModal = () => this.setState({ showRegistrationModal: true })

    return (
      <div className="container">

        <div className="row py-3">

          <div className="col-4">
            <Button variant='primary'>Crea corso</Button>
          </div>

          <div className="col-4 mx-auto text-end">

            <Button variant="primary" onClick={handleShowLoginModal}>Accedi</Button>
            <Button variant="success" onClick={handleShowRegistrationModal} style={{ marginLeft:'4px',color: 'black', backgroundColor: 'green' }}>
              Registrati
            </Button>

            {/**
             Login Modal Section
             */}
            <Modal show={this.state.showLoginModal} onHide={handleCloseLoginModal}>
              <Modal.Header closeButton>
                <Modal.Title>Accedi</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      onInput = { evt => this.setState({
                        datoEmail: evt.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='password'
                      onInput={ evt => this.setState({
                        datoPassword: evt.target.value
                      })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={ this.login } >
                  Accedi
                </Button>
              </Modal.Footer>
            </Modal>
            {/**
             ./Login Modal Section
             */}

            {/**
             Registration Modal Section
             */}
            <Modal show={this.state.showRegistrationModal} onHide={handleCloseRegistrationModal}>
              <Modal.Header closeButton>
                <Modal.Title>Registrazione</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="username"
                      autoFocus
                      onInput={evt => this.setState({
                        datoUsername: evt.target.value
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onInput={evt => this.setState({
                        datoEmail: evt.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='password'
                      onInput={evt => this.setState({
                        datoPassword: evt.target.value
                      })}

                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={ this.registrati }>
                  Registrati
                </Button>
              </Modal.Footer>
            </Modal>
            {/**
             ./Registration Modal Section
             */}
          </div>
        
        </div>
      
      </div>   
    )
  }
}

export default HomeComponent