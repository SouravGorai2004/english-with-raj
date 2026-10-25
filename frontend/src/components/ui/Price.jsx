import { formatPrice } from '../../utils/formatPrice.js';
import { discountPercent } from '../../utils/discount.js';

export default function Price({ regularMinor, discountedMinor, currency = 'INR' }) {
    const percent = discountPercent(regularMinor, discountedMinor);
    if (percent === 0) {
        return (
            <span className="price">
        <span className="price__now">{formatPrice(regularMinor, currency)}</span>
      </span>
        );
    }
    return (
        <span className="price">
      <span className="price__now">{formatPrice(discountedMinor, currency)}</span>
      <span className="price__was">
        <span className="visually-hidden">Regular price </span>
          {formatPrice(regularMinor, currency)}
      </span>
      <span className="price__off">{percent}% off</span>
    </span>
    );
}