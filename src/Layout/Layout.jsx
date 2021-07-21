import React, { useContext, useEffect, useState } from 'react';
import WhiteNavBar from '../components/Navbars/WhiteNavbar';
import FooterBlack from '../components/Footers/FooterBlack';
import DDContext from '../context/DDContext';
import LinearProgress from '@material-ui/core/LinearProgress';



const Layout = (props) => {
    const context = useContext(DDContext);
    const { cart, fetchFeaturedProducts, fetchProducts, initializeCart } = context;
    const { children, history } = props;
    const [loading, setLoading] = useState(false)

    const styles = {


        loadingDiv: {
            height: '80vh'
        },
        container: {
            minHeight: '80vh'
        },

    }

    useEffect(() => {
        let mounted = true
        setLoading(true)
        const handleLoadhandleLoad = async () => {
            if (mounted) {
                try {
                    await initializeCart()
                    await fetchFeaturedProducts();
                    await fetchProducts();
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }

            }
        }
        if (mounted) handleLoadhandleLoad()
        return () => {
            mounted = false
        }
    }, [])




    return (
        <div >
            <WhiteNavBar history={history} totalItems={cart?.total_items} />
            <div className="section-space"></div>


            {loading && <div style={styles.loadingDiv}><div className="section-space"></div> <LinearProgress />
            </div>
            }
            {!loading && children}

            <FooterBlack />
        </div>
    )
}

export default Layout