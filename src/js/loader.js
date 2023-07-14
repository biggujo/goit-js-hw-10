export default class Loader {
  #visuallyHiddenClass = 'visually-hidden';
  #loaderRef;

  constructor(refId) {
    this.loaderRef = document.getElementById(refId);
  }

  showLoader() {
    this.loaderRef.classList.remove(this.#visuallyHiddenClass);
  }

  hideLoader() {
    this.loaderRef.classList.add(this.#visuallyHiddenClass);
  }

  get loaderRef() {
    return this.#loaderRef;
  }

  set loaderRef(value) {
    this.#loaderRef = value;
  }
}