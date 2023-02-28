import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

class HomeComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showLoginModal: false,
      showRegistrationModal: false,
      datoEmail: '',
      datoPassword: '',
      datoUsername: '',
      username: '',
      createcourse: false,
      datoname: '',
      textdescription: '',
      courses_list: []
    }
  }

  set_token(token) {
    localStorage.setItem('token', token)

  }

  getCourses = async () => {
    try {
      const data = await fetch('http://localhost:3000/courses', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }

      })
      const parsedResponse = await data.json()
      console.log(parsedResponse)
      this.setState({ courses_list: parsedResponse.courses})
    }
    catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (username && token) {
      this.setState({ username })
    }
    this.getCourses()
   }


  login = async () => {
    try {
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
        this.setState({ username: parsedResponse.username })
        localStorage.setItem('username', parsedResponse.username)
        this.handleCloseLoginModal()
      }

    } catch (e) {
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
        this.setState({ username: parsedResponse.username })
        localStorage.setItem('username', parsedResponse.username)
        this.handleCloseRegistrationModal()
      }

    } catch (e) {
      console.log(e)
    }

  }

  creazione_corso = async () => {
    try {
      const data = await fetch('http://localhost:3000/courses/create/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          title: this.state.datoname,
          description: this.state.description,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

      })
      this.handleCloseCreateCourseModal()
    } catch (e) {
      console.log(e)
    }

  }


  handleShowLoginModal = () => this.setState({ showLoginModal: true })
  handleCloseLoginModal = () => this.setState({ showLoginModal: false })
  handleCloseCreateCourseModal = () => this.setState({ createcourse: false })

  handleCloseRegistrationModal = () => this.setState({ showRegistrationModal: false })
  handleShowRegistrationModal = () => this.setState({ showRegistrationModal: true })
  handleShowCreateCourseModal = () => this.setState({ createcourse: true })

  render() {
    return (
      <div className="container">

        <div className="row py-3">

          <div className="col-4">
            <Button variant='primary' onClick={this.handleShowCreateCourseModal}>Crea corso</Button>
          </div>

          <div className="col-4 mx-auto text-end">
            {
              !this.state.token ? (
                <div>
                  <Button variant="primary" onClick={this.handleShowLoginModal}>Accedi</Button>
                  <Button variant="success" onClick={this.handleShowRegistrationModal} style={{ marginLeft: '4px', color: 'black', backgroundColor: 'green' }}>
                    Registrati
                  </Button>
                </div>
              ) : (<p>{this.state.username}</p>)

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
                <Button variant="primary" onClick={this.login} >
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
                <Button variant="primary" onClick={this.registrati}>
                  Registrati
                </Button>
              </Modal.Footer>
            </Modal>
            {/**
             ./Course creation
             */}
            <Modal show={this.state.createcourse} onHide={this.handleCloseCreateCourseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title of the course"
                      autoFocus
                      onInput={evt => this.setState({
                        datoname: evt.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Course Description:
                    </Form.Label>
                    <textarea
                      type='text'
                      name="postContent"
                      placeholder='Please enter a description of the course, not more than 300 words'
                      onInput={evt => this.setState({
                        description: evt.target.value
                      })}
                    />

                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.creazione_corso} >
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
        <div>
              <ul className='course_container'>
                {this.state.courses_list.map(course => {
                  return (<li className='course'>{course.name}</li>)
                })}
              </ul>
            </div>
      </div>
    )
 }
}

export default HomeComponent