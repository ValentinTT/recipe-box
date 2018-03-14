import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import AddRecipeDialog from './AddRecipeDialog';

const styles = {
	root: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class AppHeader extends React.Component {
    state = {
        AddRecipeDialogOpen: false
    };
    handleEditDialogClose = () => this.setState({AddRecipeDialogOpen: false});
	render() {
		const { classes , children } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							{children}
						</Typography>
						<IconButton 
							className={classes.menuButton} 
							color="inherit" 
							aria-label="Menu"
							onClick={() => this.setState({AddRecipeDialogOpen: true})}>
							<AddIcon/>
						</IconButton>
					</Toolbar>
				</AppBar>
				<AddRecipeDialog
					open={this.state.AddRecipeDialogOpen}
					onClose={this.handleEditDialogClose}
				/>
			</div>
		);
	}
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
