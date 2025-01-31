function Grid({ items, renderItem }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-0">
      {items.map((item) => renderItem(item))}
    </div>
  );
}

export default Grid;
