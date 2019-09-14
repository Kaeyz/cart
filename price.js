const cart = {
  book1: 3,
  book2: 4,
  book3: 7,
  book4: 0,
  book5: 0,
};

const discountRate = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
  5: 25
};

// find highest quantity value
const calcHighest = (cart) => {
  return Object.keys(cart)
    .map(key => cart[key])
    .sort((a, b) => a > b ? -1 : 1)[0];
};


// sort to set
const sortToSet = (cart) => {
  const sets = [];
  const keys = Object.keys(cart);
  const highest = calcHighest(cart);

  for (let i = 1; i <= highest; i++) {
    let count = 0;

    keys.map(key => {
      if (cart[key] > 0) {
        cart[key] = cart[key] - 1;
        count = count + 1;
      };
    });
    sets.push(count);
  };
  return sets;
};

const calcTotalPrice = (setOfBooks) => {
  return setOfBooks.map(each => each * 8);
};



const calcDiscount = (priceForEachSet, setOfBooks) => {
  return setOfBooks.map((each, index) => priceForEachSet[index] * discountRate[each] / 100);
};

const calcFinalPrice = (prices, discount) => {
  if (prices.length === 0) {
    return 0;
  } else {
    return prices.map((price, index) => price - discount[index]).reduce((a, b) => a + b);
  };
};

const calculateQuantity = (books) => {
  if (books.length === 0) {
    return 0;
  } else {
    return books.reduce((a, b) => a + b);
  };
};

const calculatePrice = (cart) => {
  const setOfBooks = sortToSet(cart);
  const quantity = calculateQuantity(setOfBooks);
  const priceForEachSet = calcTotalPrice(setOfBooks);
  const totalDiscountForEachSet = calcDiscount(priceForEachSet, setOfBooks);
  return calcFinalPrice(priceForEachSet, totalDiscountForEachSet, quantity);
}

console.log(calculatePrice(cart));

/*
  Here is how i did it with respect to the explanation on the task

      2 copies of the first book
      2 copies of the second book
      2 copies of the third book
      1 copy of the fourth book
      1 copy of the fifth book

      -this would be divided into two set which is

      1. 5 different books together: book 1 -> book 5  = 25% discount

      2. we have 3 different books left and they get 10% discount.

      - the actual price for both set is

      1 1st set= 8 * 5 = 40euro
      2 2nd set= 8 * 3 = 24euro

      - the discount for both set is

      1. 25 / 100 * 40 = 10euro
      2. 10 / 100 * 24 = 2.40euro

      - the final price for both set is

      1. 40 - 10 = 30euro
      2. 24 - 2.4 = 21.60euro

      the total price = 30 + 21.6 = 51.6 euro
 */