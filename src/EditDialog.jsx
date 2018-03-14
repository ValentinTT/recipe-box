import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle , DialogActions, DialogContentText } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = theme => ({
	content: {
		margin: theme.spacing.unit,
	},
	title: {
		margin: theme.spacing.unit,
		textAlign: "center"
	},
	button: {
		margin: theme.spacing.unit
	}
});

class EditDialog extends React.Component {
	state = {
		inputText: this
			.props
			.ingredients
			.join(',')
	};
	handleOnCloseEdit = () => this
		.props
		.onClose(this.state.inputText);
	handleOnCloseCancel = () => {
		this.props.onClose(null);
		this.setState({
			inputText: this
				.props
				.ingredients
				.join(',')
		});
	}
	onInputChange = (e) => this
		.setState({
			inputText: e.target.value
		});
	render() {
		const {
			name,
			ingredients,
			classes,
			onClose,
			...other
		} = this.props;

		return (
			<div>
				<Dialog
					onClose={this.handleOnCloseCancel}
					aria-labelledby="dialog-title"
					{...other}>
					<DialogTitle className={classes.title} id="dialog-title">{name}</DialogTitle>
					<div className={classes.content}>
						<DialogContentText>
						Change the recipe's ingredients. 
						There must be at least one ingredients, all comma separated.
						</DialogContentText>
						<TextField
							id="ingredients"
							label="Ingredients"
							className={classes.textField}
							defaultValue={this.state.inputText}
							onChange={this.onInputChange}
							margin="normal"
							fullWidth
						/>
					</div>
					<DialogActions>
						<Button
							onClick={this.handleOnCloseCancel}
							variant="raised"
							color="primary"
							className={classes.button}>
							Cancel
						</Button>
						<Button
							onClick={this.handleOnCloseEdit}
							variant="raised"
							color="primary"
							className={classes.button}>
							Edit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

EditDialog.propTypes = {
	name: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func
};

export default withStyles(styles)(EditDialog);