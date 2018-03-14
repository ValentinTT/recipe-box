import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import AddRecipeDialog from './AddRecipeDialog';

const styles = theme => ({
    root: theme
        .mixins
        .gutters({
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: theme.spacing.unit * 3
        }),
});

class AddRecipePaper extends React.Component {
    state = {
        AddRecipeDialogOpen: false
    };
    handleEditDialogClose = () => this.setState({AddRecipeDialogOpen: false});

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        <IconButton 
                            color="inherit" 
                            aria-label="Menu"
                            onClick={() => this.setState({AddRecipeDialogOpen: true})}>
                            <AddIcon/>
                        </IconButton>
                            Add Recipe
                    </Typography>
                </Paper>
                <AddRecipeDialog
                    open={this.state.AddRecipeDialogOpen}
                    onClose={this.handleEditDialogClose}
                />
            </div>
        );
    }
}

AddRecipePaper.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddRecipePaper);