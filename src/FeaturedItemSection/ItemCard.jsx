import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { motion } from 'framer-motion';


const ItemCard = (props) => {
    const { title, image, price, quantity, history, id } = props;

    const styles = {
        card: {
            backgroundImage: "url(" + image + ")",
            height: '500px',
            backgroundSize: 'auto 100%',
            maxWidth: '400px'

        },
        title: {
            color: 'white',
            fontSize: '12px',
            textAlign: 'center'
        },
        itemContainer: {
            padding: '2%'

        },
        condition: {
            color: 'white',
            fontSize: '10px',
            textAlign: 'center'
        },
        price: {
            color: 'white',
            fontSize: '20px',
            textAlign: 'center'
        },
        quantity: {
            color: 'white',
            fontSize: '12px',
            textAlign: 'center'
        },
        label: {
            color: 'white',
            fontSize: '14'
        },
    }

    const handleSelect = () => {
        history.push(`/item/${id}`)
    }
    return (
        <Grid container justify='center' >
            <Grid item xs={12} style={styles.itemContainer}>
                <motion.div whileHover={{ scale: 1.04, cursor: 'pointer' }}>
                    <Card onClick={handleSelect} raised style={styles.card} />

                </motion.div>


            </Grid>
            <Grid item xs={12}>
                <h4 style={styles.title} >
                    <b>{title} </b>
                </h4>
            </Grid>
            <Grid item xs={6}>
                <p style={styles.label}>Condition:<b> MINT</b></p>
            </Grid>
            <Grid item xs={6}>
                <p style={styles.price}>${price}</p>
            </Grid>
            <Grid item xs={12}>
                <p style={styles.quantity}>{quantity} <br /> Quantity </p>

            </Grid>


        </Grid>

    )
}

export default ItemCard