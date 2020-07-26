import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment, dishId) => dispatch(postComment(comment, dishId))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
                    <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.addComment()}
                            />
                        </View>
                        
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            rating: null,
            author: null,
            comment: null
        }
    }
    

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleSubmit(dishId) {
        console.log(JSON.stringify(this.state));
        const comment = {rating: this.state.rating,
            author: this.state.author,
            comment: this.state.comment,
            date: new Date(),
            dishId: dishId }
        console.log(JSON.stringify(comment));
        this.props.postComment(comment);
        this.setState({
            showModal: false,
            rating: null,
            author: null,
            comment: null
        });
    }



    render() {

        const dishId = this.props.route.params.dishId;

        return(
            
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    addComment={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onRequestClose = {() => this.toggleModal() }>
                    <View style={{margin: 10}}>
                        <Rating
                            showRating
                            onFinishRating={(rating) => this.setState({rating: rating})} />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={text => this.setState({author: text})}   />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={text => this.setState({comment: text})} />  
                        <Button
                            onPress = {() =>this.handleSubmit(dishId)}
                            title="Submit"
                            buttonStyle={{backgroundColor: "#512DA8", margin:10, elevation:5}}
                            accessibilityLabel="Learn more about this purple button"
                            />
                        <Button
                            onPress = {() =>this.toggleModal()}
                            title="Cancel"
                            buttonStyle={{backgroundColor: "#999999", margin:10, elevation:5}}
                            accessibilityLabel="Learn more about this purple button"
                            />
                    </View>
                </Modal>
            </ScrollView>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);