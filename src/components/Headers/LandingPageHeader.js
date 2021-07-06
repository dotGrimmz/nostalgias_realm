import React from "react";

// reactstrap components

import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider';



// core components

function LandingPageHeader(props) {
  const { banner, checkout } = props;
  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const styles = {
    cardContainer: {
      width: '500px',
      height: '400px',
      backgroundColor: 'lightgrey',

    },
    container: {
      padding: '5%'
    },
    text: {
      fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',
      fontSize: '44px',
      color: 'black'
    },
    divider: {
      padding: '2%',
      backgroundColor: 'white'
    }
  }
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../images/headerimg.jpeg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container style={styles.container}>
          {banner && <Grid container justify='flex-end'>
            <Card raised style={styles.cardContainer}>
              <CardContent>
                <p style={styles.text}>Deno has been collecting cards  since the 90s.</p>
                <Divider style={styles.divider} />

              </CardContent>
            </Card>
          </Grid>}
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
