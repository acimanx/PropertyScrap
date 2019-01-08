import validator from 'validator';
import moment from 'moment';
const mainArrayProps = ['link', 'location', 'market_date', 'price', 'size', 'sold'];
const locationArrayProps = ['address', 'city', 'coordinates', 'country'];
const coordinatesArrayProps = ['lat', 'lng'];
const priceArrayProps = ['currency', 'value'];
const sizeArrayProps = ['gross_m2', 'rooms'];
function hasProperties(obj, props) {
  for (let i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i])) {
      return false;
    }
  }
  return true;
}
function hasAllProperties(obj) {
  const cond1 = hasProperties(obj, mainArrayProps);
  let cond2;
  let cond3;
  let cond4;
  let cond5;
  if (cond1) {
    cond2 = hasProperties(obj.location, locationArrayProps);
    if (cond2) cond3 = hasProperties(obj.location.coordinates, coordinatesArrayProps);
    else return false;
    cond4 = hasProperties(obj.price, priceArrayProps);
    cond5 = hasProperties(obj.size, sizeArrayProps);
  } else return false;
  if (cond1 && cond2 && cond3 && cond4 && cond5) return true;
  return false;
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function dateValidation(date) {
  const isValid = moment(date).isValid();
  if (!isValid) return false;
  const now = moment();
  return moment(date).isBefore(now) ? true : false;
}
function stringValidation(str, method) {
  const simpleStringRegex = /^[a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\s.]{3,50}$/;
  const addressRegex = /[a-zA-Z0-9\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df.\s,()'-]{3,150}$/;
  const currencyRegex = /^.{3,9}$/;
  if (method === 'address') {
    return str.match(addressRegex);
  } else if (method === 'currency') {
    return str.match(currencyRegex);
  } else return str.match(simpleStringRegex);
}
const validate = obj => {
  let process = { messages: [], valid: true };
  if (!hasAllProperties(obj)) {
    process.messages = ["One or more required's properties is missing!"];
    process.valid = false;
  } else {
    const { link, market_date, location, size, price, sold } = obj;
    process.messages = [];
    if (!validator.isURL(link)) {
      process.messages.push('Invalid link');
      process.valid = false;
    }
    if (!dateValidation(market_date)) {
      process.messages.push('Invalid market date');
      process.valid = false;
    }
    if (!stringValidation(location.address, 'address')) {
      process.messages.push('Invalid address');
      process.valid = false;
    }
    if (!stringValidation(location.city)) {
      process.messages.push('Invalid city');
      process.valid = false;
    }
    if (!stringValidation(location.country)) {
      process.messages.push('Invalid country');
      process.valid = false;
    }
    if (!isNumeric(location['coordinates']['lat']) || !isNumeric(location['coordinates']['lng'])) {
      process.messages.push('Invalid coordinates');
      process.valid = false;
    }
    if (!stringValidation(price.currency, 'currency')) {
      process.messages.push('Invalid currency');
      process.valid = false;
    }
    if (typeof price.value !== 'number') {
      process.messages.push('Invalid price value , it should be a number');
      process.valid = false;
    }
    if (price.value === 0) {
      process.messages.push('Invalid price value, cannot be Zero!');
      process.valid = false;
    }
    if (typeof size.gross_m2 !== 'number' || size.gross_m2 < 1) {
      process.messages.push('Invalid area , it should be a number');
      process.valid = false;
    }
    if (typeof size.rooms !== 'number' || size.rooms < 1) {
      process.messages.push('Invalid rooms value!');
      process.valid = false;
    }
    if (typeof sold !== 'boolean') {
      process.messages.push('Invalid sold , it should be boolean');
      process.valid = false;
    }
  }
  return process;
};
export default validate;
