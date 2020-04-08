import React, { Component } from 'react';

import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
/* import {COMMENTS} from '../shared/Comments';
import {LEADERS} from '../shared/Leaders';
import {PROMOTIONS} from '../shared/promotions';
import {DISHES} from '../shared/dishes'; */

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment, fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state =>{
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  };
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm:()=>{ dispatch(actions.reset('feedback'))}

});

class Main extends Component{

  
  constructor(props){
    super(props);
    
    //this.props.fetchDishes();
    console.log("props---------->",props);
   /*  this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }; */
    
  }

 /*  onDishSelect(dishId){
    this.setState({
        selectedDish : dishId,
    }); 
}*/
componentDidMount() {
  console.log("Component did mount");
  this.props.fetchDishes();
}
  render(){
      const HomePage = ()=>{
          return( <Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />);
      }
      const DishWithId =({match})=>{ 
       
        return(<DishDetails selectedDish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}/>
        );
      }
  return (
    <div className="App">
    <Header/>
    <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes.dishes}/>}/>
        <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/about" component={()=><About leaders={this.props.leaders}/>}/>
        <Redirect to="/home"/>
    </Switch>
   {/*  <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/> */}
    {/* <DishDetails selectedDish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/> */}
    <Footer/>
  </div>
  );}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
