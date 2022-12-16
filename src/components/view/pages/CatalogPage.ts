import { el } from 'redom';
import { Product } from '../../../types';
import { getInfo } from '../../utils';
import Dropdown from '../elements/dropdown';
import Filters from '../elements/filters';
import SearchInput from '../elements/searchInput';
import { viewControls } from '../elements/viewControls';
import Catalog from './catalog';

class CatalogPage extends Catalog {
  private dropdown: Dropdown = new Dropdown();
  private searchInput: SearchInput = new SearchInput();
  private filters: Filters = new Filters(this.filter.bind(this));

  constructor() {
    super();
  }

  element() {
    const dropdownElem = this.dropdown.element(this.sort.bind(this));
    const searchInputElem = this.searchInput.element(this.filter.bind(this));
    const filtersElem = this.filters.element();

    const element: HTMLElement = el('section.catalog', [
      el('.container.catalog__container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          filtersElem,
          el('.catalog__products', [
            el('.catalog__controls', [
              dropdownElem,
              viewControls(this.changeView.bind(this)),
              searchInputElem,
            ]),
            this.productsList,
            this.pagesContainer,
          ]),
        ]),
      ]),
    ]);
    return element;
  }

  draw(data: Readonly<Product>[]) {
    super.draw(data);

    const categories = getInfo('category', this.productsData);
    const brand = getInfo('brand', this.productsData);
    this.filters.setBrandsAndCategories(categories, brand);
    this.restorePreviousState();
  }

  private restorePreviousState() {
    const params = new URLSearchParams(location.search);
    const [sortOption, filterOption] = [params.get('sort'), params.get('search')];
    if (sortOption) {
      this.dropdown.text.textContent = sortOption.replace('_', ' ');
      this.dropdown.closeIcon.classList.add('dropdown__close--active');
      this.sort(sortOption);
    }
    if (filterOption) {
      this.searchInput.setValue(filterOption);
      this.filter(filterOption);
    }
  }
}
export default CatalogPage;