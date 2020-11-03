/**
 * Created by Yash Goel on 08 - sept - 2020
 *
 */

import {RESET, SET_SELECTION, SET_COMMENT} from '../Actions';
import {PreparedDataList, ReadyList} from '../Constants';

let surveyReady = [
  {
    key: 'EXECUTIVE',
    type: 'DIRECTORY',
    list: ReadyList.NURSING,
  },
  {
    key: 'NURSING',
    type: 'SURVEY',
    list: ReadyList.NURSING,
  },
  {
    key: 'BUSINESS',
    type: 'OFFICE',
    list: ReadyList.NURSING,
  },
  {
    key: 'MDS',
    type: 'SURVEY',
    list: ReadyList.MDS,
  },
  {
    key: 'THERAPY',
    type: 'SURVEY',
    list: ReadyList.THERAPY,
  },
  {
    key: 'DIETARY',
    type: 'SURVEY',
    list: ReadyList.DIETARY,
  },
  {
    key: 'ENVIRON',
    type: 'SURVEY',
    list: ReadyList.ENVIRON,
  },
  {
    key: 'SOCIAL SERVICE',
    type: 'SURVEY',
    list: ReadyList.SOCIAL,
  },
  {
    key: 'Activity',
    type: 'SURVEY',
    list: ReadyList.ACTIVITIES,
  },
];

const DataReducer = (state = {surveyReady: surveyReady}, action) => {
  switch (action.type) {
    case RESET:
      return {surveyReady: surveyReady, surveyPreparedness: surveyPreparedness};
    case SET_SELECTION: {
      const which =
        action.which == 'SURVEY' ? 'surveyReady' : 'surveyPreparedness';

      state[which].map((item, index) => {
        if (item.key == action.key) {
          item.list[action.index].selected = action.value;
          if (action.value == false) item.list[action.index].comment = '';
        }
        return item;
      });

      return state;
    }
    case SET_COMMENT: {
      let which =
        action.which == 'SURVEY' ? 'surveyReady' : 'surveyPreparedness';

      state[which].map((item, index) => {
        if (item.key == action.key) {
          item.list[action.index].comment = action.value;
        }
        return item;
      });

      return {...state};
    }

    default:
      return state;
  }
};

/**
 * Sort list Accordint to name in Ascending Order
 *
 */
function sortAse(arr) {
  arr.sort(function (a, b) {
    var i = 0;
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}

/**
 * Sort list Accordint to name in decending Order
 *
 */
function sortDec(arr) {
  arr.sort(function (a, b) {
    if (a.name < b.name) {
      return 1;
    } else if (a.name > b.name) {
      return -1;
    } else {
      return 0;
    }
  });

  return arr;
}
export default DataReducer;
