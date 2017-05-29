import * as moment from 'moment';
const dict = {
  ru: {
    weekdays: true
  },
  'en-au': {
  }
};
class Localization {
  constructor(name) {
    this._name = name;
    this._moment = moment;
    require(`moment/locale/${name}`);
    this._moment.locale(name);
  }
  get name() {
    return this._name;
  }
  get weekdays() {
    return this._moment.weekdays(dict[this._name].weekdays);
  }
  get moment() {
    return this._moment;
  }
}
const locatization = new Localization('ru'); // en-au
export default locatization;