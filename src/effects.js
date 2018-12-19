import { delay, CANCEL, detach } from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';

export default {
  delay,
  CANCEL,
  detach,
  ...sagaEffects,
};
