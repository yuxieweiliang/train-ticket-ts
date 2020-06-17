import { dispatchType } from '../type'

export type fromType = string
export type toType = string
export type isCitySelectorVisibleType = boolean
export type currentSelectingLeftCityType = boolean
export type cityDataType = object | null
export type isLoadingCityDataType = boolean
export type isDateSelectorVisibleType = boolean
export type departDateType = number
export type highSpeedType = boolean

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export interface initDataType {
    from: fromType
    to: toType
    isCitySelectorVisible: isCitySelectorVisibleType
    currentSelectingLeftCity: currentSelectingLeftCityType
    cityData: cityDataType
    isLoadingCityData: isLoadingCityDataType
    isDateSelectorVisible: isDateSelectorVisibleType
    departDate: departDateType
    highSpeed: highSpeedType
}

export interface ActionFormType {
    type: typeof ACTION_SET_FROM
    payload: fromType
}

export function setFrom(from: fromType): ActionFormType {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}

export interface ActionToType {
    type: typeof ACTION_SET_TO
    payload: fromType
}

export function setTo(to: toType): ActionToType {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

export interface ActionIsCitySelectorVisibleType {
    type: typeof ACTION_SET_IS_LOADING_CITY_DATA
    payload: isCitySelectorVisibleType
}

export function setIsLoadingCityData(isLoadingCityData: isCitySelectorVisibleType): ActionIsCitySelectorVisibleType {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

/*export interface ActionSetCityData {
    type: typeof ACTION_SET_CITY_DATA
    payload: currentSelectingLeftCityType
}*/

export function setCityData(cityDate: currentSelectingLeftCityType) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityDate,
    };
}

export function toggleHighSpeed(): any {
    return (dispatch: (arg0: dispatchType) => void, getState: () => { highSpeed: any; }) => {
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
