import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      console.log(data.products);
      setTotalPage(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const pageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page)
      setPage(selectedPage);
  };
  return (
    <div className="App">
      <h2>Pagination</h2>
      {products.length > 0 && (
        <div className="main-container">
          {products.map((item) => (
            <div className="card-container">
              <h3 className="card-title">{item.title}</h3>

              <img
                className="card-image"
                src={item.thumbnail}
                alt={item.title}
              />
              <h4>Rs: {item.price}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "footer-page" : "disabled_page"}
            onClick={() => pageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(totalPage)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selected-page" : "footer-page"}
                key={i}
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPage ? "footer-page" : "disabled_page"}
            onClick={() => pageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
