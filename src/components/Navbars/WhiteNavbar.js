/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Badge from '@material-ui/core/Badge';
import { useHistory } from "react-router-dom";



function WhiteNavbar(props) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { totalItems } = props;
  let history = useHistory();

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="bg-white fixed-top" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/home" tag={Link} id="navbar-brand">
              Nostalgia's Realm
            </NavbarBrand>
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink1"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app"></i>
                  <p>BasketBall</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" right>
                  <DropdownItem to="/catelog/basketball/nba" tag={Link}>
                    <i className="now-ui-icons design_image"></i>
                    NBA
                  </DropdownItem>
                  <DropdownItem to="/catelog/basketball/ncaa" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36"></i>
                    NCAA
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i
                    aria-hidden={true}
                    className="now-ui-icons files_paper"
                  ></i>
                  <p>Football</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  <DropdownItem to="/catelog/football/nfl" tag={Link}>
                    <i className="now-ui-icons shopping_box"></i>
                    NFL
                  </DropdownItem>
                  <DropdownItem to="/catelog/football/ncaa" tag={Link}>
                    <i className="now-ui-icons ui-2_settings-90"></i>
                    NCAA
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i
                    aria-hidden={true}
                    className="now-ui-icons files_paper"
                  ></i>
                  <p>Baseball</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  <DropdownItem to="/catelog/baseball/mlb" tag={Link}>
                    <i className="now-ui-icons shopping_box"></i>
                    MLB
                  </DropdownItem>
                  <DropdownItem to="/catelog/baseball/ncaa" tag={Link}>
                    <i className="now-ui-icons ui-2_settings-90"></i>
                    NCAA
                  </DropdownItem>
                  <DropdownItem to="/catelog/baseball/highschool" tag={Link}>
                    <i className="now-ui-icons ui-2_settings-90"></i>
                    High School
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i
                    aria-hidden={true}
                    className="now-ui-icons files_paper"
                  ></i>
                  <p>More</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  <DropdownItem to="/sections#headers" tag={Link}>
                    <i className="now-ui-icons shopping_box"></i>
                    Testimonials
                  </DropdownItem>
                  <DropdownItem to="/contact" tag={Link}>
                    <i className="now-ui-icons ui-2_settings-90"></i>
                    Contact Us
                  </DropdownItem>
                  <DropdownItem to="/sections#features" tag={Link}>
                    <i className="now-ui-icons ui-2_settings-90"></i>
                    Discounts
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button
                  className="nav-link"
                  style={{ width: '90%' }}
                  target="_blank"
                  fullWidth
                  onClick={() => history.push('/checkout')}
                >
                  <Badge badgeContent={totalItems} >
                    <ShoppingCartSharpIcon />

                  </Badge>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default WhiteNavbar;
