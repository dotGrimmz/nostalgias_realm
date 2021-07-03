import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CommerceService from '../service/CommerceService';
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
const service = new CommerceService();

const CatalogItemPage = props => {
    const { match, history } = props;
    const classes = useStyles();
    const context = useContext(DDTContext);

    const { enqueueSnackbar } = useSnackbar();

    const { addToCart } = context;



    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState("");
    const [cardCount, setCardCount] = useState();
    const [imageArr, setImageArr] = useState([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [originalPrice, setOriginalPrice] = useState()
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


    const counter = () => {
        let arr = [];
        for (let i = 1; i <= cardCount; i++) {
            i.toString()
            arr.push(i)
        }
        return arr
    }
    useEffect(() => {
        const fetchSelectedProduct = async () => {
            try {
                setLoading(true)
                let res = await service.fetchSelectedProduct(match.params.id);
                console.log(res, 'should be single product')
                setPrice(res.price.formatted);
                setOriginalPrice(res.price.raw)
                setCardCount(res.inventory.available);
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

        fetchSelectedProduct()
    }, [match.params.id])

    useEffect(() => {
        const adjustPriceToQuantity = () => {
            console.log(originalPrice, quantity, 'multiply these two')
            if (quantity === "") {

                let updatedPrice = originalPrice * 1
                setPrice(updatedPrice)
            } else {
                let updatedPrice = originalPrice * quantity
                setPrice(updatedPrice)
            }
        }
        adjustPriceToQuantity()
    }, [quantity, originalPrice])

    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }


    const handleAddToCart = async (id, quantity) => {
        let parsedQuantity = parseInt(quantity)
        let message = await addToCart(id, parsedQuantity)
        enqueueSnackbar(message, { variant: 'success' });

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
                                <Grid item xs={6} align='center'>
                                    <Select
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    >
                                        {!loading && counter().map(x => (
                                            < MenuItem key={x} value={x} > {x}</MenuItem>
                                        ))}
                                    </Select>
                                    <br />
                                    <p className='text-center'>Quantity</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3 className="title text-center">${price}</h3>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <Button
                                    fullWidth
                                    onClick={() => handleAddToCart(match.params.id, quantity)}
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