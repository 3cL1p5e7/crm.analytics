export const SET_DATE = 'SET_DATE';
export function actions(dispatch, ownProps) {
  return {
    setDate: function (date) {
      dispatch({ type: SET_DATE, date });
    }
  }
};