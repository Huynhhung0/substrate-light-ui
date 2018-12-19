// Copyright 2017-2018 @polkadot/light-apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { action, observable } from 'mobx';
import store from 'store';

const LS_KEY = `__substrate-light::firstRun`;

interface OnboardingStoreInterface {
  isFirstRun?: boolean;
  setIsFirstRun: (isFirstRun: boolean) => void;
  updateLS: () => void;
}

export class OnboardingStore implements OnboardingStoreInterface {
  @observable
  isFirstRun?: boolean; // If it's the 1st time the user is running the app

  constructor () {
    const isFirstRun = store.get(LS_KEY);

    if (isFirstRun === undefined) {
      // Set store property to true.
      this.setIsFirstRun(true);
    } else {
      this.setIsFirstRun(isFirstRun);
    }
  }

  @action
  setIsFirstRun = (isFirstRun: boolean) => {
    this.isFirstRun = isFirstRun;
    this.updateLS();
  }

  updateLS = () => store.set(LS_KEY, this.isFirstRun);
}

export default new OnboardingStore();
