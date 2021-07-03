/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function FooterBlack() {
  const styles = {
    footer: {
      flexShrink: 0
    }
  }

  return (
    <>
      <footer className="footer" style={styles.footer} data-background-color="black">
        <Container>
          <nav>
            <ul>

              <li>
                <a
                  href="http://presentation.creative-tim.com?ref=nuk-pro-react-footer-black"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="http://blog.creative-tim.com?ref=nuk-pro-react-footer-black"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, {" "}

            Powered by{" "}
            <b
            >
              Jus Grimmz
            </b>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
