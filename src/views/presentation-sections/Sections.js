import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function Sections() {
  return (
    <>
      <div className="section section-sections" data-background-color="gray">
        <Container>
          <Col className="ml-auto mr-auto" md="8">
            <div className="section-description text-center">
              <h2 className="title">Sections you will love</h2>
              <h5 className="description">
                Build pages in no time using pre-made sections! From headers to
                footers, you will be able to choose the best combination for
                your project. We have created multiple sections for you to put
                together and customise into pixel perfect example pages.
              </h5>
              <Button
                className="btn-round"
                to="/sections"
                color="info"
                tag={Link}
              >
                View All Sections
              </Button>
            </div>
          </Col>
        </Container>
        <Container fluid>
          <div className="section-cols">
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/header1.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/header2.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/header3.jpg").default
                  }
                ></img>
                <img
                  alt="..."
                  className="rellax"
                  data-rellax-speed="4"
                  src={
                    require("assets/img/presentation-page/pricing5.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/header4.jpg").default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features1.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features2.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features3.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features4.jpg")
                      .default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features5.jpg")
                      .default
                  }
                ></img>
                <img
                  alt="..."
                  className="rellax"
                  data-rellax-speed="5"
                  src={
                    require("assets/img/presentation-page/features2.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features6.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features7.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/features8.jpg")
                      .default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/blogpost1.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/blogpost2.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/blogpost3.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/blogpost4.jpg")
                      .default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/blogpost5.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/team1.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/team2.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/team3.jpg").default
                  }
                ></img>
                <img
                  alt="..."
                  className="rellax"
                  data-rellax-speed="5"
                  src={
                    require("assets/img/presentation-page/contact1.jpg").default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/team4.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/team5.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/projects1.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/projects2.jpg")
                      .default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/projects4.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/projects5.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/pricing1.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/pricing2.jpg").default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/pricing3.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/pricing4.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/pricing5.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/testimonials1.jpg")
                      .default
                  }
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/testimonials2.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/testimonials3.jpg")
                      .default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/contact1.jpg").default
                  }
                ></img>
              </Col>
              <Col md="3">
                <img
                  alt="..."
                  src={
                    require("assets/img/presentation-page/contact2.jpg").default
                  }
                ></img>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Sections;
