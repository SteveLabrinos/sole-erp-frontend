import { makeStyles } from '@material-ui/core';
import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 23/2/21.
 */


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 250,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
    create: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: green[500],
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: green[600],
        }
    },
    error: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    }
}));

export default function ItemForm(props) {
    const classes = useStyles();
    const {values, submit, change, item } = props;

    return (
        <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                        required
                        fullWidth
                        id="description"
                        label="Περιγραφή"
                        name="description"
                        placeholder="Συμπληρώστε Περιγραφή"
                        autoComplete="description"
                        value={values.description}
                        autoFocus
                        onChange={change('description')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-role-label">Τύπος</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            required
                            fullWidth
                            value={values.type_code}
                            onChange={change('type_code')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={'I'}>Υλικό</MenuItem>
                            <MenuItem value={'S'}>Υπηρεσία</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-role-label">Μονάδα Μέτρησης</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            required
                            fullWidth
                            value={values.measurement_code}
                            onChange={change('measurement_code')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={'KG'}>Κιλά</MenuItem>
                            <MenuItem value={'MR'}>Μέτρα</MenuItem>
                            <MenuItem value={'EA'}>Τεμάχιο</MenuItem>
                            <MenuItem value={'WE'}>Εβδομάδα</MenuItem>
                            <MenuItem value={'DA'}>Ημέρα</MenuItem>
                            <MenuItem value={'MO'}>Μήνας</MenuItem>
                            <MenuItem value={'YE'}>Χρόνος</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justify={item ? 'space-between' : 'center'}>
                <Grid item xs={12} md={6} lg={4}>
                    {item ?
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Ενημέρωση Στοιχείων
                        </Button> :
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            className={classes.create}
                        >
                            Καταχώρηση Εγγραφής
                        </Button>
                    }
                </Grid>
                {item ?
                    <Grid item xs={12} md={3} lg={4}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={() => alert('delete ' + item.item_id + ' to be added')}
                            className={classes.error}
                        >
                            Διαγραφή Εγγραφής
                        </Button>
                    </Grid> : null
                }
            </Grid>
        </form>
    );
}