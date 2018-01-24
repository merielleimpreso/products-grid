import _ from 'underscore';
import moment from 'moment';

export default function addUtils() {
  _.mixin({

    formatPriceToDollars: function(cents) {
      let dollars = cents / 100;
      return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    },

    formatDateToRelative: function(unformattedDate) {
      let now = moment();
      let date = moment(unformattedDate);
      let days = moment.duration(now.diff(date), 'milliseconds').asDays();
      return (days > 7) ? moment(unformattedDate).format('ll') : moment(unformattedDate).fromNow();
    },

    getProductsLink(page, sort) {
      const PAGE_LIMIT = 20;
      let link = 'http://localhost:3000/products';
      link += '?_page=' + page + '&_limit=' + PAGE_LIMIT;
      if (sort != '') {
        link += '&_sort=' + sort
      };
      return link;
    },

  });
}
