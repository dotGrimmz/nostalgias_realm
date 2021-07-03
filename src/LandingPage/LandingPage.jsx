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
    const { initializeCart } = context;
    const [loading, setLoading] = useState(false);

    const [featuredProducts, setFeaturedProducts] = useState([])

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
        const fetchProducts = async () => {
            setLoading(true)
            try {
                let response = await service.fetchFeaturedProducts()
                setFeaturedProducts(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        const fetchCart = async () => {
            try {
                let res = await service.getCart()
                console.log(res, 'the shopping cart')
                initializeCart(res)
            } catch (err) {
                console.error(err)
            }
        }

        fetchCart()
    }, [initializeCart])

    const routeToItem = (id) => {
        history.push(`/item/${id}`)
    }


    return (
        <>
            <LandingPageHeader />
            {loading && <div style={styles.loadingDiv}> <h1 className='text-center'>Getting all the cool kids ready ...</h1><LinearProgress /></div>}
            {!loading && <div><FeaturedItemSection featuredProducts={featuredProducts} history={history} />
                <CatalogSection catalogObj={catalogObj} routeToItem={routeToItem} /> </div>}
            <div className="section-space"></div>

        </>
    )
}


export default LandingPage