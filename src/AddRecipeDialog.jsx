import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    },
	title: {
		textAlign: "center"
    },
});

class AddRecipeDialog extends React.Component {
	state = {
        name: "",
        ingredients: []
    };
    handleInputChange = inputField => event => {
        switch(inputField) {
            case "name":
                this.setState({
                    [inputField]: event.target.value,
                });
                break;
            case "ingredients": 
                this.setState({
                    [inputField]: event.target.value.split(','),
                });
                break;
        }
    }
	handleOnCloseCreate = () => {
        this.props.dispatch({
            type: "ADD_RECIPE",
            name: this.state.name,
            ingredients: this.state.ingredients,
        })
        this.props.onClose();
    }
	handleOnCloseCancel = () => {
		this.props.onClose(null);
	}
	onInputChange = (e) => this
		.setState({
			inputText: e.target.value
		});
	render() {
		const {
			name,
            ingredients,
            onClose,
            classes,
			...other
		} = this.props;

		return (
			<Dialog
				onClose={this.handleOnCloseCancel}
				aria-labelledby="dialog-title"
				{...other}>
                <div className={classes.container}>
                    <DialogTitle className={classes.title} id="dialog-title">Create New Recipe</DialogTitle>
                    <TextField
                        id="name"
                        label="Name"
                        onChange={this.handleInputChange('name')}
                        margin="normal"
                        fullWidth
                        />
                    <br/>
                    <TextField
                        id="ingredients"
                        label="Ingredients"
                        placeholder={"ej. salt, sugar"}
                        onChange={this.handleInputChange('ingredients')}
                        margin="normal"
                        fullWidth
                        />
                    <DialogActions>
                        <Button
                            onClick={this.handleOnCloseCancel}
                            variant="raised"
                            color="primary"
                            size="small"
                            >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleOnCloseCreate}
                            variant="raised"
                            color="primary"
                            size="small"
                            >
                            Create
                        </Button>
                    </DialogActions>
                </div>
			</Dialog>
		);
	}
}

AddRecipeDialog.propTypes = {
	name: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    classes: PropTypes.object.isRequired
};

AddRecipeDialog = withStyles(styles)(AddRecipeDialog);
AddRecipeDialog = connect()(AddRecipeDialog);

export default AddRecipeDialog;