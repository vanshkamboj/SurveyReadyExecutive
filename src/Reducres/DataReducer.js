/**
 * Created by Yash Goel on 08 - sept - 2020
 *
 */

import {RESET, SET_SELECTION, SET_COMMENT} from '../Actions';
import { ReadyList} from '../Constants';

let surveyReady = [
  {
    key: 'NURSING',
    type: 'SURVEY',
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
    case RESET: {
      state['surveyReady'].map((item, index) => {
        item.list.map((data, index) => {
          data.selected = false;
          data.comment = '';
          return data;
        });
        return item;
      });
      return {...state, printList: {}};
    }
    case SET_SELECTION: {
      state['surveyReady'].map((item, index) => {
        if (item.key == action.key) {
          item.list[action.index].selected = action.value;
          if (action.value == true) {
            let id = getID(action);

            state.printList[id] = item.list[action.index];
          }
          if (action.value == false) {
            item.list[action.index].comment = '';
            let id = getID(action);

            delete state.printList[id];
          }
        }
        return item;
      });

      return state;
    }
    case SET_COMMENT: {

      state['surveyReady'].map((item, index) => {
        if (item.key == action.key) {
          item.list[action.index].comment = action.value;
          let id = getID(action);
          state.printList[id] = item.list[action.index];
        }
        return item;
      });

      return {...state};
    }

    default:
      return state;
  }
};

const getID = (action) => {
  let which =  'surveyReady';
  return which + action.key + action.index;
};


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
