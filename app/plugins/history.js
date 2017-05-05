import createHashHistory from 'history/createHashHistory';
import store from 'store';

const locations = {
  '/calendar': {
    name: 'calendar',
    activator() {
      store;
    }
  }
};

const history = createHashHistory();
history.listen(location => {
  console.log(store);
  console.log('going to', location)
});

export default history;