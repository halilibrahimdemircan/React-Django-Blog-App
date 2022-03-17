import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

const NavbarComp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <Navbar color='primary' expand='sm' fixed='top' light>
                <NavbarBrand>
                    <Link style={{ color: "white", textDecoration: "none" }} to='/'>Blog App</Link>
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav className='me-auto' navbar>
                        <NavItem>
                            <NavLink>
                                <Link style={{ color: "white", textDecoration: "none" }} to='/'>Home</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        {!isAuthenticated ? (
                            <>
                                <NavItem>
                                    <NavLink>
                                        <Link style={{ color: "white", textDecoration: "none" }} to='/new'>New Post</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link style={{ color: "white", textDecoration: "none" }} to='/login'>Login</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link style={{ color: "white", textDecoration: "none" }} to='/register'>Register</Link>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <NavItem>
                                <NavLink style={{ color: "white", textDecoration: "none" }}>Logout</NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarComp;