import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DDTContext from '../context/DDContext';
import CatalogItem from '../CatalogSection/CatalogItem';
import { useSnackbar } from 'notistack';
import LinearProgress from '@material-ui/core/LinearProgress';






const useStyles = makeStyles({
    root: {
        background:
            "radial-gradient(ellipse at center," +
            "black" +
            " 0," +
            "grey" +
            " 100%)",
    },

});

const CatalogItemPage = props => {
    const { match, history } = props;
    const classes = useStyles();
    const context = useContext(DDTContext);

    const { enqueueSnackbar } = useSnackbar();

    const { addToCart, fetchSelectedProduct } = context;



    const [price, setPrice] = useState("");
    const [imageArr, setImageArr] = useState([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [suggestions, setSuggestions] = useState([]);



    const styles = {

        imageStyle: {
            height: "400px",
            maxWidth: "400px",
            backgroundSize: 'auto 100%',
        },
        container: {
            minHeight: '80vh'
        },
        loadingDiv: {
            height: '80vh'
        }

    }



    useEffect(() => {
        let mounted = true
        const getSelectedProduct = async () => {
            try {
                setLoading(true)
                let res = await fetchSelectedProduct(match.params.id);
                setPrice(res.price.formatted);
                setImageArr(res.assets)
                setName(res.name)
                setDescription(res.description)
                setSuggestions(res.related_products)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (mounted) getSelectedProduct();
        return () => {
            mounted = false
        }

        // fetch selected producted was not here before clean up
    }, [match.params.id, fetchSelectedProduct])



    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }


    const handleAddToCart = async (id) => {

        try {
            let message = await addToCart(id, 1);
            console.log(message, 'message')
            enqueueSnackbar(message, { variant: 'success' });
        } catch (err) {
            console.error(err)
        }



    }

    return (
        <div className="cd-section" id="pricing" >

            <div
                id="pricing-1"
                style={{
                    backgroundColor: 'lightgrey'
                }}
            >
                <div className="section-space"></div>
                {loading && <div>                 <div className="section-space"></div>
                    <LinearProgress />
                    <div style={styles.loadingDiv}></div>

                </div>}
                {!loading && <Container style={styles.container} >

                    <Grid container alignContent='center' spacing={2}>

                        <Grid item xs={12} md={6} align='center'>
                            <Carousel >
                                {imageArr.map((x, index) => (
                                    < div key={index} >
                                        <img src={x.url} style={styles.imageStyle} alt={x.name} />
                                    </div>
                                ))}

                            </Carousel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container justify='center'>

                                <Grid item xs={12}>
                                    <h2 className="title text-center">{name}</h2>

                                </Grid>
                                <Grid item xs={12}>
                                    <Divider variant='middle' />
                                </Grid>
                                <Grid item xs={12}>
                                    <p className="description text-center" style={{ color: 'black' }}> Please allow up to 1 business day for shipping confirmation  </p>

                                </Grid>

                                <Grid item xs={6}>
                                    <h3 className="title text-center">${price}</h3>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <Button
                                    fullWidth
                                    onClick={() => handleAddToCart(match.params.id, 1)}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    classes={{ root: classes.root }}>
                                    ADD TO CART
                                </Button>
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <h6 className="title text-center" dangerouslySetInnerHTML={{
                                    __html: description
                                }}></h6>

                            </Grid>



                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant='middle' />
                        </Grid>
                        <div className="section-space"></div>


                        {suggestions.slice(0, 4).map((x, index) => (
                            <Grid key={index} item xs={6} md={3} >
                                <CatalogItem
                                    description={x.description}
                                    price={x.price.formatted}
                                    image={x.media.source}
                                    title={x.name}
                                    routeToItem={routeToItem}
                                    id={x.id}
                                />
                            </Grid>
                        ))}


                    </Grid>



                </Container>}



                <div className="section-space"></div>


            </div>

        </div >
    )
}


export default CatalogItemPage