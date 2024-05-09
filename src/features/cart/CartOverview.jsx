function CartOverview() {
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4">
      <p className="text-stone-300 font-semibold space-x-4">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <a href="#">Open cart &rarr;</a>
    </div>
  );
}

export default CartOverview;
