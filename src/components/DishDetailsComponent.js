import React, {Component} from "react";
import{Card, CardImg, CardBody, CardText, CardTitle,Breadcrumb,BreadcrumbItem, Button, Col, Row, Modal, ModalBody, ModalHeader, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val)=> !val || (val.length <= len);
const minLength = (len) => (val)=> !val || (val.length >= len);
   class DishDetails extends Component{
        constructor(props){
            super(props);
            this.state = {
                isCommentModalOpen: false
            };
            this.toggleCommentModal = this.toggleCommentModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleCommentModal(){
            this.setState({
                isCommentModalOpen: !this.state.isCommentModalOpen
            })
        }

        handleSubmit(values){
        this.props.addComment(this.props.selectedDish.id,
            values.rating,values.name,values.comment);
        
        }

        render(){
        if(this.props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
            }
        else if(this.props.errMess){
           return( <div className="container">
            <div className="row">
                <h4>{this.props.errMess}</h4>
            </div>
            </div>);
        }
        if(this.props.selectedDish!=null){
          
          const comment = this.props.comments.map((eachComment)=>{
            return(
            <div key={eachComment.id} className="row"> 
            <div className="col-12"><b>{eachComment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(eachComment.date)))}</b></div>
            <div className="col-12"><i>"{eachComment.comment}"</i></div>
                </div>
            );
        });
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {this.props.selectedDish.name}
                    </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.selectedDish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-4 mr-2">
                <Card>
                    <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
                    <CardBody>
                    <CardTitle>{this.props.selectedDish.name}</CardTitle>
                    <CardText>{this.props.selectedDish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                <div className="col-12 col-md-6">
                    {comment}
                    <div>
                    <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                    </Button>
                    </div>
                </div>
                </div>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
        <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                <Row className="form-group">
                <Col md={{size: 12}}>
                <Label htmlFor=".rating">Rating</Label>
                </Col>
                <Col md={{size: 12}}>
                    <Control.select model=".rating" name="rating" className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>
                </Row>
                <Row className="form-group">
                <Col md={{size: 12}}>
                <Label htmlFor=".name">Your Name</Label>
                </Col> 
                <Col md={{size: 12}}>
                    <Control.text model=".name" id="name" name="name" placeholder="Your Name"
                    className="form-control" 
                    validators={{
                        required,
                        minLength:minLength(3),
                        maxLength:maxLength(15)
                    }}/>
                    <Errors className="text-danger" model=".name"
                        show="touched"
                        messages={{
                            required:'Required',
                            minLength:'Must be greater than 2 characters',
                            maxLength:'Must be less than 15 characters or less',
                        }
                        }/>
                </Col>
                </Row>
                <Row className="form-group">
                    <Col md={{size: 12}}>
                    <Label htmlFor=".comment">Comment</Label>
                    </Col>
                    <Col md={{size: 12}}>
                        <Control.textarea model=".comment" id="comment" name="comment" className="form-control"/>
                    </Col>
                </Row>
               
                <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
        </ModalBody>
    </Modal>
                </div>
            )
    
        }
        else{
            return(
                <div></div>
            )
        }
    }
    }


export default DishDetails;