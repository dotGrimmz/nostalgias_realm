import React, { useState, useEffect, useContext } from 'react';
import DDContext from 'context/DDContext';
import { makeStyles } from '@material-ui/core/styles';
import CatalogSection from 'CatalogSection/CatalogSection';

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

const CatalogPage = props => {
    const { match, history } = props;
    const classes = useStyles();
    const context = useContext(DDContext);
    const {  products } = context;
    const { category, level } = match.params
    const [pageProducts, setPageProducts] = useState([])

     
    useEffect(()=> {
        const handlePageSort = (category, level) => {
            let selectedProducts = []
            // clear the page 
            setPageProducts(selectedProducts)
            products.map(x => {
                x.categories.map(y => {
                    if (y.slug.includes(`${category}-${level}`) ) {
                            console.log(y, 'this is all the products that load in this tag')
                            selectedProducts.push(x)
                    }
                })
            })
            setPageProducts(selectedProducts)
        }
        handlePageSort(category, level)
    },[])

    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }

    console.log('page products', pageProducts)

    let catalogObj = {
        page: category.toUpperCase(),
        subtitle: level.toUpperCase(),


    }

    return(
        <div>
            <CatalogSection catalogObj={catalogObj} products={pageProducts} routeToItem={routeToItem} />
        </div>
    )
}

export default CatalogPage