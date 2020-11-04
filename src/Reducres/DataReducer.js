/**
 * Created by Yash Goel on 08 - sept - 2020
 *
 */

import {RESET, SET_SELECTION, SET_COMMENT} from '../Actions';
import {PreparedDataList, ReadyList} from '../Constants';

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

let intialState = {
  surveyReady: surveyReady,
  printList: {},
};
const DataReducer = (state = {...intialState}, action) => {
  switch (action.type) {
    case RESET: {
      const which = 'surveyReady';
      state[which].map((item, index) => {
        item.list.map((data, index) => {
          data.selected = false;
          data.comment = '';
          console.log(data, '<----d');
          return data;
        });
        return item;
      });
      return {...state, printList: {}};
    }
    case SET_SELECTION: {
      const which = 'surveyReady';

      state[which].map((item, index) => {
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
      let which = 'surveyReady';

      state[which].map((item, index) => {
        if (item.key == action.key) {
          item.list[action.index].comment = action.value;
          let id = getID(action);
          state.printList[id] = item.list[action.index];
          console.log(state.printList, ' =========  ', item);
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
  let which = 'surveyReady';
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
