import React, { useContext, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import DDTContext from '../context/DDContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ToolTip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CommerceService from '../service/CommerceService';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    updateBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "green" +
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
const service = new CommerceService()

const CartItem = (props) => {

    const { name, image, price, id, selected, handleUpdateQuantity, handleRemoveItem, productId } = props;
    const [quantity, setQuantity] = useState(1);
    const [toggleSelect, setToggleSelect] = useState(false);
    const [cardCount, setCardCount] = useState(1)
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        const fetchCardTotal = async (id) => {
            setLoading(true)
            try {
                let res = await service.getCardTotal(id)
                setCardCount(res.inventory.available)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchCardTotal(productId)
    }, [])




    const counter = () => {
        let arr = [];
        for (let i = 1; i <= cardCount; i++) {
            i.toString()
            arr.push(i)
        }
        return arr
    }
    return (
        <Slide direction='up' timeout={{ enter: 900 }} in={!loading}  >

            <Card style={styles.container} raised >

                <Grid container justify='flex-start' alignItems='center'>
                    <Grid item md={2} xs={12}>
                        <img src={image} alt={name} style={styles.image} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <h2 className="title text-center">{name}</h2>
                        <InputLabel id="label">{selected}</InputLabel>


                        <Button variant='outlined' className='text-center' onClick={() => setToggleSelect(!toggleSelect)}>Quantity</Button>
                    </Grid>
                    <Grid item align='center' xs={6} md={2} >
                        <ToolTip title="Update Quantity" aria-label="update" placement='top' >
                            <IconButton classes={{ root: classes.updateBtn }} onClick={() => handleUpdateQuantity(id, quantity)} >
                                <UpdateIcon />
                            </IconButton>
                        </ToolTip>
                        <br />

                        {toggleSelect && <Select
                            labelId='label'
                            id='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            label="title"
                        >
                            {!loading && counter().map((x, i) => (
                                < MenuItem key={x} value={x} > {x}</MenuItem>
                            ))}
                        </Select>}
                    </Grid>
                    <Grid item align='center' xs={6} md={2}>
                        <ToolTip title="Remove Item" placement='top' aria-label="delete">

                            <IconButton classes={{ root: classes.deleteBtn }} onClick={() => handleRemoveItem(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ToolTip>

                    </Grid>
                    <Grid item align='center' md={2} xs={12} >

                        <h2 className="title text-center">${price * selected}</h2>

                    </Grid>
                </Grid>
            </Card>
        </Slide >

    )
}


export default CartItem;