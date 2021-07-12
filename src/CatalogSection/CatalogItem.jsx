import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

    media: {
        height: 100,
        width: 150,
        maxWidth: 175,
        backgroundSize: 'auto 100%',
    },
    card: {
        padding: '2%',
        background:
            "radial-gradient(ellipse at center," +
            "lightyellow" +
            " 0," +
            "grey" +
            " 100%)",
    },
    homeCard: {
        padding: '2%',
        background:
            "radial-gradient(ellipse at center," +
            "lightyellow" +
            " 0," +
            "grey" +
            " 100%)",
        minHeight: 350,
        maxHeight: 450

    },
});

const CatalogItem = props => {
    const classes = useStyles();
    const { description, price, image, title, allowDescription, id, routeToItem, homePage } = props;

    const styles = {
        price: {
            textAlign: 'center'
        },
        description: {
            textAlign: 'center',
            padding: '2%'
        }
    }


    return (
        <Card classes={{ root: homePage ? classes.homeCard : classes.card }} raised>

            <CardHeader style={{ textAlign: 'center' }} title={title} />
            <CardActionArea onClick={() => routeToItem(id)}>


                <CardContent>
                    <Grid container justify='center' alignContent='center' alignItems='center' spacing={2}>
                        <Grid item xs={12} md={8} align='center'>
                            <CardMedia
                                className={classes.media}
                                image={image}
                                title={title}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={styles.price} >
                            <p>${price}</p>

                        </Grid>
                        {allowDescription && <Grid item xs={12}>
                            <Divider variant='middle' />

                        </Grid>
                        }
                        {allowDescription && <Grid item xs={12} style={styles.description}  >

                            <p style={{ fontSize: 12 }} dangerouslySetInnerHTML={{
                                __html: description
                            }}></p>
                        </Grid>}
                    </Grid>
                </CardContent>

            </CardActionArea>

        </Card>
    )
}

export default CatalogItem;