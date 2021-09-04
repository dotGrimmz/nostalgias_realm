import React, { useState } from "react";

// reactstrap components

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';

import NostalgiasRealmIcon from "components/CustomIcons/NostalgiasRealmIcon";
import Slide from '@material-ui/core/Slide';


// core components

function LandingPageHeader(props) {
  const { banner } = props;
  const [loaded, setLoaded] = useState(true)
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
      padding: '5%',
      height: 'auto'
    },
    text: {
      fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',
      fontSize: '44px',
      color: 'black'
    },
    divider: {
      padding: '2%',
      backgroundColor: 'white'
    },
    titleText: {
      color: 'Grey',
      backgroundColor: 'black',
      borderRadius: '70%',
      padding: '3.2%',
      marginRight: '10%'
    },
    subtitleText: {
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '5%',
      margin: '5%'
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
          {banner && <Grid container justify="center" alignItems='center' direction='row'>
            <Slide direction="left" in={loaded} mountOnEnter unmountOnExit>
              <Grid item xs={12} md={4}>
                <h1 className="title text-center" style={styles.titleText}>Experience Nostalgia</h1>

              </Grid>
            </Slide>
            <Grid item xs={12} md={4} align='center'  >
              <NostalgiasRealmIcon iconHeight={'350px'} iconWidth={'350px'} zoomIn />

            </Grid>
            <Slide direction="right" in={loaded} mountOnEnter unmountOnExit>
              <Grid item xs={12} md={4}  >
                <h2 className="title text-center" style={styles.subtitleText}>Enter the realm</h2>

              </Grid>
            </Slide>

          </Grid>}
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
