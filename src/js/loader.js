export default class Loader {
  #loaderRef;

  constructor(ref) {
    this.loaderRef = ref;
  }

  showLoader() {
    this.loaderRef.hidden = false;
  }

  hideLoader() {
    this.loaderRef.hidden = true;
  }

  get loaderRef() {
    return this.#loaderRef;
  }

  set loaderRef(value) {
    this.#loaderRef = value;
  }
}