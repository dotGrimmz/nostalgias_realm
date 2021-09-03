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
            height: '90vh'
        },
        container: {
            minHeight: '80vh'
        },

    }


    // this might be seperated out to add into finding the token id seperately
    // if (cart.line_items.length > 0) {

    //     let token = await this.getCheckoutToken(cart?.id)
    //     console.log(token, 'should be the token in initalize cart')
    //     if (token !== undefined) this.setState({ checkoutToken: token })

    // }
    useEffect(() => {
        let mounted = true
        setLoading(true)
        const handleLoad = async () => {
            if (mounted) {
                try {
                    await initializeCart();
                    console.log('cart initialized completed')



                    await fetchFeaturedProducts();
                    console.log('featured products completed');

                    await fetchProducts();
                    console.log('products completed');


                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }

            }
        }
        if (mounted) handleLoad()
        return () => {
            mounted = false

        }

    }, []);




    // handle the geo location shit
    // useEffect(async () => {
    //     let location = await fetchIPAddress()
    //     let abbv = states?.find(x => x.label === location.region)
    //     await handleTaxInfo(checkoutToken?.id, abbv?.id, location?.postal_zip_code)
    //     console.log('tax info loaded')

    // }, [])




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