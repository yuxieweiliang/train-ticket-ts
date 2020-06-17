import React, {
    useCallback,
    useMemo
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';
/*
import CitySelector from '../common/CitySelector.jsx';
import DateSelector from '../common/DateSelector.jsx';

import { h0 } from '../common/fp';
*/

import {
    exchangeFromTo,
    showCitySelector,
    /*hideCitySelector,
    fetchCityData,
    setSelectedCity,
    hideDateSelector,
    setDepartDate,*/
    showDateSelector,
    toggleHighSpeed,
} from './actions';

type props = {
    from: string,
    to: string,
    highSpeed: boolean,
    dispatch: any,
    departDate: Date,
}
function App(props: { from: any; to: any; highSpeed: any; dispatch: any; departDate: any; }) {
    const {
        from,
        to,
        /*isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,*/
        highSpeed,
        dispatch,
        departDate,
    } = props;

    const onBack = useCallback(window.history.back, []);

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch);
    }, []);

    /*const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity,
        }, dispatch);
    }, []);*/

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector,
        }, dispatch);
    }, []);

    /*const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        }, dispatch);
    }, []);*/

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed,
        }, dispatch);
    }, []);

    /*const onSelectDate = useCallback((day) => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector())
    }, []);*/

    console.log(from, to)
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}/>
            </div>
            <form action="./query.html" className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed
                    highSpeed={highSpeed}
                    {...highSpeedCbs}
                />
                <Submit/>
            </form>
            {/*<CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />*/}
        </div>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App as any);
