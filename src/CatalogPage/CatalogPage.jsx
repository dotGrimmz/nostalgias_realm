import React, { useState, useEffect, useContext } from 'react';
import DDContext from 'context/DDContext';
import CatalogSection from 'CatalogSection/CatalogSection';



const CatalogPage = props => {
    const { match, history } = props;
    const context = useContext(DDContext);
    const {  products } = context;
    const { category, level } = match.params
    const [pageProducts, setPageProducts] = useState(products)

     
    useEffect(()=> {
        const handlePageSort = (category, level) => {
            let selectedProducts = []
            // clear the page 
            pageProducts.forEach(x => {
                x.categories.forEach(y => {
                    if (y.slug.includes(category) && y.slug.includes(level) ) {
                            selectedProducts.push(x)
                    }
                })
            })
            setPageProducts(selectedProducts)
        }
        handlePageSort(category, level)
    },[category, level, pageProducts])

    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }


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