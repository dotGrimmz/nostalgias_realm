import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CatalogItem from './CatalogItem';
import Pagination from '@material-ui/lab/Pagination';
import Slide from '@material-ui/core/Slide';







const useStyles = makeStyles({
    root: {
        backgroundColor: 'transparent',
        width: 240
    },
    paper: {
        width: 240
    },
    paperAnchorDockedLeft: {
        borderRight: '0px transparent',
    },
    nav: {
        align: 'center',
    }
})


const CatalogSection = (props) => {
    const { page, subtitle } = props.catalogObj;
    const { products } = props;

    const [pageNum, setPageNum] = useState(0);

    const classes = useStyles()
    const styles = {
        titlePage: {
            color: 'white'
        },
        drawer: {
            width: 240,
            flexShrink: 0,
            color: 'transparent',
            shadow: '0'
        },
        catalogDisplay: {
            padding: '2%'
        }
    }






    let itemsPerPage = 6;
    let itemsDisplayed = pageNum * itemsPerPage;
    let pageCount = Math.floor(products.length / itemsPerPage);

    return (
        <div className="cd-section" id="pricing" >
            <div
                id="pricing-1"

            >

                <Container>
                    <Grid container justify='center' >
                        <Grid item xs={12} >

                            <h2 className="title text-center">{subtitle}</h2>


                        </Grid>
                        <Grid item xs={12}>
                            <p className="description text-center">
                                {page}                </p>

                        </Grid>
                        <div className="section-space"></div>

                    </Grid>
                    <Grid container spacing={2} justify='center' alignItems='center'>

                        {products?.slice(itemsDisplayed, itemsDisplayed + itemsPerPage).map((x => (
                            < Slide key={x.id} direction='up' timeout={{ enter: 900 }
                            } in={true}  >
                                <Grid xs={12} md={4} item style={styles.catalogDisplay}>
                                    <CatalogItem
                                        title={x.name}
                                        description={x.description}
                                        image={x.media.source}
                                        price={x.price.formatted}
                                        allowDescription
                                        id={x.id}
                                        routeToItem={props.routeToItem}
                                        homePage
                                    />

                                </Grid>
                            </Slide>
                        )))}

                        <Grid item align='center'>
                            <Pagination
                                variant='outlined'
                                color='primary'
                                onChange={(e, value) => setPageNum(value)}
                                defaultPage={1}
                                page={pageNum}
                                size='large'
                                count={pageCount}
                                classes={{ root: classes.nav }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div >
    )
}

export default CatalogSection;