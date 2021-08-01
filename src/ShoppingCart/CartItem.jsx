import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import DDTContext from '../context/DDContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ToolTip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    addBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "green" +
            " 100%)",
        color: 'black'
    },
    removeBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "maroon" +
            " 100%)",
        color: 'black'
    },
    deleteBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "grey" +
            " 100%)",
        color: 'black'
    }

});

const CartItem = (props) => {

    const { name, image, price, id, quantity, handleUpdateQuantity } = props;


    const context = useContext(DDTContext);
    const { handleRemoveItem } = context;
    const classes = useStyles();


    const styles = {
        image: {
            height: 140,
            width: 140,
            zShadow: 2
        },
        container: {
            background: "radial-gradient(ellipse at center," +
                "white" +
                " 0," +
                "black" +
                " 100%)",
            width: '80%',
            padding: '2%'
        },


    }






    return (
        <Slide direction='up' timeout={{ enter: 900 }} in  >

            <Card style={styles.container} raised >

                <Grid container justify='flex-start' alignItems='center'>
                    <Grid item md={2} xs={12} >
                        <img src={image} alt={name} style={styles.image} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <h2 className="title text-center">{name}</h2>
                        <InputLabel id="label">{quantity}</InputLabel>
                        <p className="text-center">Quantity</p>


                    </Grid>
                    <Grid item align='center' xs={6} md={1} >
                        <ToolTip title="Add Quantity" aria-label="add" placement='top' >
                            <IconButton classes={{ root: classes.addBtn }} onClick={() => handleUpdateQuantity(id, quantity + 1)} >
                                <AddCircleIcon />
                            </IconButton>
                        </ToolTip>


                    </Grid>
                    <Grid item align='center' xs={6} md={1} >
                        <ToolTip title="Remove " aria-label="remove" placement='top' >
                            <IconButton classes={{ root: classes.removeBtn }} onClick={() => handleUpdateQuantity(id, quantity - 1)} >
                                <RemoveCircleOutlinedIcon />
                            </IconButton>
                        </ToolTip>


                    </Grid>
                    <Grid item align='center' xs={12} md={2}>
                        <ToolTip title="Remove Item" placement='top' aria-label="delete">

                            <IconButton classes={{ root: classes.deleteBtn }} onClick={() => handleRemoveItem(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ToolTip>

                    </Grid>
                    <Grid item align='center' md={2} xs={12} >

                        <h2 className="title text-center">${price}</h2>

                    </Grid>
                </Grid>
            </Card>
        </Slide >

    )
}


export default CartItem;