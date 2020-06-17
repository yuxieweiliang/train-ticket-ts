import {dispatchType} from "../type";

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export function setFrom(from: string) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}

export function setTo(to: string) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

export function setIsLoadingCityData(isLoadingCityData: boolean) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

export function setCityData(cityDate: object) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityDate,
    };
}

export function toggleHighSpeed(): any {
    return (dispatch: (arg0: dispatchType) => {}, getState: () => { highSpeed: any; }) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}

export function showCitySelector(currentSelectingLeftCity: object) {
    return (dispatch: (arg0: dispatchType) => {}) => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}

export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function setSelectedCity(city: string) {
    return (dispatch: (arg0: dispatchType) => {}, getState: () => { currentSelectingLeftCity: any; }) => {
        const { currentSelectingLeftCity } = getState();

        if (currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        }

        dispatch(hideCitySelector());
    };
}

export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}

export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}

export function exchangeFromTo() {
    return (dispatch: (arg0: { type: string; payload: string; }) => void, getState: () => { from: string; to: string; }) => {
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    };
}

export function setDepartDate(departDate: any) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

export function fetchCityData() {
    return (dispatch: (arg0: { type: string; payload: boolean | object; }) => void, getState: () => { isLoadingCityData: any; }) => {
        const { isLoadingCityData } = getState();

        if (isLoadingCityData) {
            return;
        }

        const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

        if (Date.now() < cache.expires) {
            dispatch(setCityData(cache.data));

            return;
        }

        dispatch(setIsLoadingCityData(true));

        fetch('/rest/cities?_' + Date.now())
            .then(res => res.json())
            .then(cityData => {
                dispatch(setCityData(cityData));

                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000,
                        data: cityData,
                    }),
                );

                dispatch(setIsLoadingCityData(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false));
            });
    };
}
