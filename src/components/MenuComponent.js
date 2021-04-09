import React, { Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';

// this is the Menu Component
class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selesctedDish:null
        }
    }
//Change state of your component
    onDishSelect(dish) {
        this.setState({ selesctedDish: dish });
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name} </CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>Currently no dish selected!</Card>
                </div>
                
            )
        }
    }

    render() {
// map: go through the dishes arrey, for every dish I will do the return=>
        const menu = this.props.dishes.map((dish) => {
            
            return (
                //each items should have a unique key 
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() =>this.onDishSelect(dish) }>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name} </CardTitle>  
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        });
        
        
        return (
            <div className="container">
                <div className="row">               
                    {menu}                    
                </div>
                <div className="row">
                    {this.renderDish(this.state.selesctedDish)}
                </div>
            </div>
            
        );
    }
    
}

export default Menu;