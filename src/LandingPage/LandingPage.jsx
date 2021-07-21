import React, { useState, useEffect, useContext } from 'react';
import FeaturedItemSection from '../FeaturedItemSection/FeaturedItemSection.jsx';
import CatalogSection from '../CatalogSection/CatalogSection.jsx';
import LandingPageHeader from '../components/Headers/LandingPageHeader';
import CommerceService from '../service/CommerceService';
import DDTContext from '../context/DDContext';
import LinearProgress from '@material-ui/core/LinearProgress';



const service = new CommerceService();

const LandingPage = props => {
    const { history } = props;
    const context = useContext(DDTContext);
    const { featuredProducts, products } = context;
    const [loading, setLoading] = useState(false);

    const [_featuredProducts, setFeaturedProducts] = useState([])
    const [pageProducts, setPageProducts] = useState([])

    let catalogObj = {
        page: 'Baseball',
        subtitle: "MLB",


    }

    const styles = {
        loadingDiv: {
            height: '15vh'
        }
    }



    useEffect(() => {
        let mounted = true;
        setLoading(true)

        const getProducts = async () => {
            let defaultProducts = []
            try {
                setFeaturedProducts(await featuredProducts)
                products.map(x => {
                    let invalid = false
                    x.categories.map(y => {
                        if (y.slug === 'featured') invalid = true
                    })
                    if (!invalid) defaultProducts.push(x)
                });
                setPageProducts(defaultProducts)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (mounted) getProducts();
        return () => {
            mounted = false
        }


    }, [featuredProducts, products])



    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }


    return (
        <>
            <LandingPageHeader banner />
            {loading && <div style={styles.loadingDiv}> <h1 className='text-center'>Getting all the cool kids ready ...</h1><LinearProgress /></div>}
            {!loading && <div><FeaturedItemSection featuredProducts={_featuredProducts} history={history} />
                <CatalogSection catalogObj={catalogObj} routeToItem={routeToItem} products={pageProducts} /> </div>}
            <div className="section-space"></div>

        </>
    )
}


export default LandingPage