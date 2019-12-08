import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';




//stateless functional component. 
const handleClick = (props, name) => {
    //console.log(props);

    props.history.push(`/${name}`);
};

const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div className='nv'>
                <Navbar color="light" light expand="md" >
                    <NavbarBrand href="/">{props.brand}</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>

                            <NavItem className='lk'>
                                <NavLink onClick={() => {
                                    handleClick(props, "add-attendee-to-talk")
                                }}>Add Attendee To Talk</NavLink>
                            </NavItem>

                        </Nav>

                    </Collapse>
                </Navbar>
            </div>
        </>
    );
}

Header.propTypes = {
    brand: PropTypes.string,
    scrollToRef: PropTypes.func
};


export default Header;