import { el } from 'redom';
import { Product } from '../../../types';
import { getInfo, getMinAndMax } from '../../utils';
import { viewControls } from '../elements/viewControls';
import Catalog from './catalog';

class CatalogPage extends Catalog {
  constructor() {
    super();
  }

  element() {
    const element: HTMLElement = el('section.catalog', [
      el('.container.catalog__container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          this.filters.element(),
          el('.catalog__products', [
            el('.catalog__controls', [
              el('button.catalog__filters-show', { onclick: this.filters.show.bind(this.filters) }),
              this.filters.dropdown.element(),
              viewControls(this.changeView.bind(this)),
              this.filters.searchInput.element(),
            ]),
            this.productsInfo,
            this.productsListEl(),
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
    const priceValues = getMinAndMax('price', this.productsData);
    const stockValues = getMinAndMax('stock', this.productsData);
    this.filters.setFilters(categories, brand, priceValues, stockValues);
    this.filterAndSort();
  }
}
export default CatalogPage;
