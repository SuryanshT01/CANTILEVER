import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { ShoppingCart, User, ChevronDown } from 'lucide-react'

const Header = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' expand='lg' className="py-3 shadow-sm">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className="font-bold text-xl text-primary me-4">
              ZetaMart
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle 
            aria-controls='basic-navbar-nav' 
            onClick={() => setIsOpen(!isOpen)}
            className="border-0 focus:outline-none"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav' className={`${isOpen ? 'show' : ''}`}>
            <Nav className='ms-auto align-items-center'>
              <Route render={({ history }) => (
                <div className="me-3 my-2 my-lg-0">
                  <SearchBox history={history} />
                </div>
              )} />
              <LinkContainer to='/cart'>
                <Nav.Link className="d-flex align-items-center me-3">
                  <ShoppingCart size={20} className="me-2" />
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      <User size={20} className="me-2" />
                      {userInfo.name}
                      <ChevronDown size={16} className="ms-2" />
                    </span>
                  } 
                  id='username'
                  className="me-3"
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className="d-flex align-items-center me-3">
                    <User size={20} className="me-2" />
                    <span>Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      Admin
                      <ChevronDown size={16} className="ms-2" />
                    </span>
                  } 
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header