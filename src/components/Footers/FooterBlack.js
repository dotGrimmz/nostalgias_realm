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
                  href="/contact"
                  
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/nostalgiasrealm"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/fantasy_senpai/"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright text-center" id="copyright" >
          
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
