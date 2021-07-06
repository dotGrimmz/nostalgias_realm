import React, { useContext, useEffect, useState } from 'react';
import WhiteNavBar from '../components/Navbars/WhiteNavbar';
import FooterBlack from '../components/Footers/FooterBlack';
import DDContext from '../context/DDContext';
import CommerceService from '../service/CommerceService';

const service = new CommerceService()


const Layout = (props) => {
    const context = useContext(DDContext);
    const { shoppingCart } = context;
    const { children, history } = props;
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        const handleTotalItems = async () => {
            try {
                let cart = await service.getCart()
                setTotalItems(cart.total_items)

            } catch (err) {
                console.error(err)
            }

        }

        handleTotalItems()
    }, [shoppingCart])

    return (
        <div >
            <WhiteNavBar shoppingCart={totalItems} history={history} />
            <div className="section-space"></div>



            {children}

            <FooterBlack />
        </div>
    )
}

export default Layout