export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  removeItems = () => {
    this._container.innerHTML = '';
  }

  setItem = (element) => {
    this._container.prepend(element);
  }

  renderItems = () => {
    this._data.reverse().forEach(item => this._renderer(item));
  }
}
