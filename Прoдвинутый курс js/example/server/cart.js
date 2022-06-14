let add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
  let find = cart.contents.find((el) => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
let deleteItem = (cart, req) => {
  let index;
  let find = cart.contents.find((el, i) => {
    if (el.id_product === +req.params.id) {
      index = i;
      return true;
    }
  });

  if (!find) {
    return JSON.stringify(cart, null, 4);
  }

  if (find.quantity > 0) {
    find.quantity -= req.body.quantity;
    cart.contents.splice(index, 1, find);
  } else {
    cart.contents.slice(index, 1);
  }

  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  deleteItem,
};
