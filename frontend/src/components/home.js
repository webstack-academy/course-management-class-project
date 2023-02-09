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
      token: '',
      username: '',
    }
  }

  set_token(token){
    localStorage.setItem('token',token)
    this.setState({token})
  }

  componentDidMount(){
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if(username && token){
        this.set_token(token)
        this.setState({username})
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
      this.set_token(parsedResponse.token)
      this.setState({username : parsedResponse.username})
      localStorage.setItem('username', parsedResponse.username)
      this.handleCloseLoginModal()
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
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await data.json()

      if (data.status !== 200) {
        alert(parsedResponse.msg)
      } else {
        this.set_token(parsedResponse.token)
        this.setState({username : parsedResponse.username})
        localStorage.setItem('username', parsedResponse.username)
        this.handleCloseRegistrationModal()
      }

  } catch (e) {
    console.log(e)
  }

  }
  


  handleShowLoginModal = () => this.setState({ showLoginModal: true })
  handleCloseLoginModal = () => this.setState({ showLoginModal: false })

  handleCloseRegistrationModal = () => this.setState({ showRegistrationModal: false })
  handleShowRegistrationModal = () => this.setState({ showRegistrationModal: true })
  
  render() {
    return (
      <div className="container">

        <div className="row py-3">

          <div className="col-4">
            <Button variant='primary'>Crea corso</Button>
          </div>

          <div className="col-4 mx-auto text-end">
            {
              !this.state.token?(
              <div> 
                  <Button variant="primary" onClick={this.handleShowLoginModal}>Accedi</Button>
                  <Button variant="success" onClick={this.handleShowRegistrationModal} style={{ marginLeft:'4px',color: 'black', backgroundColor: 'green' }}>
                      Registrati
                  </Button>
              </div>
              ):(<p>{this.state.username}</p>)
          
            }

            {/**
             Login Modal Section
             */}
            <Modal show={this.state.showLoginModal} onHide={this.handleCloseLoginModal}>
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
            <Modal show={this.state.showRegistrationModal} onHide={this.handleCloseRegistrationModal}>
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