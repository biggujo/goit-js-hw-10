export default class Loader {
  static #visuallyHiddenClass = 'visually-hidden';
  #loaderRef;

  constructor(refId) {
    this.loaderRef = document.getElementById(refId);
  }

  showLoader() {
    this.loaderRef.classList.remove(Loader.#visuallyHiddenClass);
  }

  hideLoader() {
    this.loaderRef.classList.add(Loader.#visuallyHiddenClass);
  }

  get loaderRef() {
    return this.#loaderRef;
  }

  set loaderRef(value) {
    this.#loaderRef = value;
  }
}