import React, {useCallback, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Cockpit from '../../UI/Cockpit/Cockpit';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Deposits from '../../components/Deposits/Deposits';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import TransactionChart from '../../components/TransactionChart/TransactionChart';
import { entitiesSelector } from '../Entity/entitySlice';
import { transactionSelector } from '../Transaction/transactionSlice';
import { dashboardSelector, fetchMonthlyIncome, fetchIncomesPerMonth } from './dashboardSlice';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 28/2/2021.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));


export default function Dashboard ({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { loading } = useSelector(entitiesSelector);
    const { transactionLoading } = useSelector(transactionSelector);
    const { monthlyIncome, dashboardLoading, incomes } = useSelector(dashboardSelector);

    //  get monthly income
    const onFetchMonthlyIncome = useCallback(() => {
        dispatch(fetchMonthlyIncome(token));
    }, [dispatch, token]);

    //  get incomes per month
    const onFetchIncomesPerMonth = useCallback(() => {
        dispatch(fetchIncomesPerMonth(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (!monthlyIncome) {
            onFetchMonthlyIncome();
        }
        if (incomes.length === 0) {
            onFetchIncomesPerMonth();
        }
    }, [monthlyIncome, onFetchMonthlyIncome, onFetchIncomesPerMonth, incomes.length]);

    //  displaying data
    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    const displayDeposits = dashboardLoading ?
        <LoadingProgress /> :
        <Paper className={classes.paper} style={{ height: 240 }}>
            <Deposits title="Μηνιαία Έσοδα" income={monthlyIncome} />
        </Paper>;

    const displayChart = dashboardLoading ?
        <LoadingProgress /> :
        <Paper className={classes.paper} style={{ height: 240 }}>
            <TransactionChart title="Ανάλυση Εσόδων" incomes={incomes} />
        </Paper>;

    return (
        <React.Fragment>
            {authRedirect}
            <CssBaseline />
            <Cockpit title="Αρχική" />
            <Grid container alignItems="center" className={classes.container} spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    {displayDeposits}
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {displayChart}
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <RecentTransactions
                            entityLoading={loading}
                            transactionLoading={transactionLoading}
                            token={token} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}