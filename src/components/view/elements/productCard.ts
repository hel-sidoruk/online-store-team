import { el } from 'redom';
import { Product } from '../../../types';
import { router } from '../../router';
import { getProductsInCart } from '../../utils';
import BaseProduct from './Product';

class ProductCard extends BaseProduct<Product> {
  private buyBtn = el('button.card__btn.btn.btn-fill', 'Buy now');
  constructor(product: Readonly<Product>) {
    super(product);
  }

  element() {
    this.restoreState();
    this.addBtn.addEventListener('click', () =>
      this.addToCart({ ...this.product, count: this.addToCartBtn.count })
    );
    const cardInfo = el(
      '.card__info',
      { onclick: () => router.navigate(`/details/${this.product.id}`) },
      [
        el('span.card__info-title', 'Category: ', [el('span', this.product.category)]),
        el('span.card__info-title', 'Brand: ', [el('span', this.product.brand)]),
        el('span.card__info-title', 'Stock: ', [el('span', this.product.stock)]),
        el('span.card__info-title', 'Rating: ', [el('span', this.product.rating)]),
        el('span.card__info-title', 'Discount: ', [
          el('span', `${this.product.discountPercentage}%`),
        ]),
        el('span.card__info-link', 'More info'),
      ]
    );
    cardInfo.setAttribute('data-navigo', '');

    return el('.card', [
      el('.card__top', [el('img.card__image', { src: this.product.images[0] }), cardInfo]),
      el('h4.card__title', this.product.title),
      el('span.card__price', `$${this.product.price}`),
      el('.card__buttons', [this.addBtn, this.buyBtn]),
    ]);
  }

  private restoreState() {
    const prod = getProductsInCart().find((item) => item.title === this.product.title);
    if (prod) this.addToCartBtn.count = prod.count;
  }
}

export default ProductCard;
