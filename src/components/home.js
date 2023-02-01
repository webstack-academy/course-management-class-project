import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class HomeComponent extends React.Component {
  
    constructor(props){
      super(props)
  
      this.state = {
        showModal: false,
            datoEmail: '',
            datoPassword: '',
            datoUsername:'',
      }}
      registrati = () => {
        alert(this.state.datoEmail)
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState !== 4) return;

            if (this.status === 200) {
                const data = JSON.parse(this.responseText)
                window.localStorage.setItem('token',data.token)
            };

        }
        request.open('POST', 'login01')
        request.setRequestHeader('Content-Type', 'application/json')
        request.send(JSON.stringify({
            email: this.state.datoEmail,
            password: this.state.datoPassword,
            username: this.state.datoUsername
        }))
    }
    render() {
      const handleClose = () => this.setState({ showModal: false })
      const handleShow = () => this.setState({ showModal: true })
      
      return (
        <div className="container">
  
          <div className="row py-3">
  
            <div className="col-4">
              <Button variant='primary'>Crea corso</Button>
            </div>
  
            <div className="col-4 mx-auto text-end">
  

  
              <Button variant="primary" >Accedi</Button>
              <Button variant="success" onClick={handleShow} style={{ marginLeft:'4px',color: 'black', backgroundColor: 'green' }}>
                Registrati
              </Button>
              
              <Modal show={this.state.showModal} onHide={handleClose}>
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
            </div>
          
          </div>
        
        </div>   
      )
    }
  }


export default HomeComponent