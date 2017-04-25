export const SET_ACTIVE = 'SET_ACTIVE';
export function actions(dispatch, ownProps) {
  return {
    setActive: function (name) {
      dispatch({ type: SET_ACTIVE, name });
    }
  }
};