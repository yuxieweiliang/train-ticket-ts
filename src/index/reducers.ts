import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    ACTION_SET_CITY_DATA,
    ACTION_SET_IS_LOADING_CITY_DATA,
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    ACTION_SET_HIGH_SPEED,
    ACTION_SET_DEPART_DATE,

    fromType,
    ActionFormType
} from './actions';

const reducers = {
    from(state: fromType = '北京', action: ActionFormType): fromType {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_FROM:
                return payload;
            default:
                return state;
        }
    },
    /*to(state = '上海', action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_TO:
                return payload;
            default:
        }

        return state;
    },
    isCitySelectorVisible(state = false, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    currentSelectingLeftCity(state = false, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
                return payload;
            default:
        }

        return state;
    },
    cityData(state = null, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_CITY_DATA:
                return payload;
            default:
        }

        return state;
    },
    isLoadingCityData(state = false, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_LOADING_CITY_DATA:
                return payload;
            default:
        }

        return state;
    },
    isDateSelectorVisible(state = false, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    highSpeed(state = false, action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_HIGH_SPEED:
                return payload;
            default:
        }

        return state;
    },
    departDate(state = Date.now(), action: { type: any; payload: any; }) {
        const { type, payload } = action;
        switch(type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }

        return state;
    },*/
};
export default reducers;
