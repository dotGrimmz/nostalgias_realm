import React from 'react';
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';


const FeaturedItemSection = (props) => {
    const { featuredProducts, history } = props;



    return (
        <div className="cd-section" id="pricing">
            <div
                className="pricing-1 section-image"
                id="pricing-1"
                style={{
                    backgroundColor: 'red'
                }} >
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <h2 className="title">Latest Releases!</h2>
                            <p className="description">
                                Fully Authentic and Verifiable
                </p>
                            <div className="section-space"></div>
                        </Col>
                    </Row>
                    <Row >

                        {featuredProducts?.map((x, i) => (
                            <Grid key={i} item xs={12} sm={6} md={4}>
                                <ItemCard
                                    history={history}
                                    title={x.name}
                                    image={x.media.source}
                                    price={x.price.formatted}
                                    quantity={x.inventory.available}
                                    id={x.id}

                                />

                            </Grid>
                        ))}


                    </Row>

                </Container>
            </div></div>
    )
}

export default FeaturedItemSection;