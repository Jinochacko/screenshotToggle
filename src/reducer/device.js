import {UPDATE_DEVICEINFO, UPDATE_DEVICEINFO_SUCCESS,UPDATE_DEVICEINFO_ERROR} from '../common/constants';

const initialState = {
  info: {
    data: [],
    isUpdating: false,
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEVICEINFO:
      return {
        ...state,
        info: { isUpdating: true,}
      };
    case UPDATE_DEVICEINFO_SUCCESS:
      return {
        ...state,
        info: {
          data: action.payload,
          isUpdating: false,
        }
      };
    case UPDATE_DEVICEINFO_ERROR:
      return {
        ...state,
        info: {
          isUpdating: false,
        }
      };

    default:
      return state;
  }
};