import _ from 'underscore';

export default function addUtils() {
  _.mixin({

    formatPriceToDollars: function(cents) {
      let dollars = cents / 100;
      return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    },

  });
}
