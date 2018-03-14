import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemText } from 'material-ui/List';
import EditDialog from './EditDialog';

const recipeStyles = theme => ({
    card: {
        width: 400,
        margin: theme.spacing.unit,
    },
    actions: {
        display: 'flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme
            .transitions
            .create('transform', {duration: theme.transitions.duration.shortest}),
        marginLeft: 'auto'
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
});

class RecipeCard extends React.Component {
    state = {
        expanded: false,
        EditDialogOpen: false
    };

    handleExpandClick = () => this.setState({
        expanded: !this.state.expanded
    });

    handleEditClick = () => this.setState({EditDialogOpen: true});

    handleEditDialogClose = value => {
        this.setState({EditDialogOpen: false});
        typeof value === 'string' 
            ? this.props.dispatch({
                type: "EDIT_RECIPE",
                name: this.props.name,
                ingredients: value.split(',').map(i => i.trim()),
              })
            : null;
    };

    handleOnDeleteClick = () => this.props.dispatch({
        type: "REMOVE_RECIPE",
        name: this.props.name
    });

    render() {
        const {name, ingredients, classes} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <CardHeader title={name}></CardHeader>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more">
                            <ExpandMoreIcon/>
                        </IconButton>
                        <IconButton
                            onClick={this.handleEditClick}
                            aria-label="Edit Recipe">
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            onClick={this.handleOnDeleteClick}
                            aria-label="Delete Recipe">
                            <DeleteIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <List>
                                {ingredients.map((ingredient, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={ingredient}/>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Collapse>
                </Card>
                <EditDialog
                    open={this.state.EditDialogOpen}
                    onClose={this.handleEditDialogClose}
                    name={name}
                    ingredients={ingredients}
                />
            </div>
        );
    }
}

RecipeCard.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

RecipeCard = withStyles(recipeStyles)(RecipeCard);
RecipeCard = connect()(RecipeCard);
export default RecipeCard;
