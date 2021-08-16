import { FC, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { STORAGE_KEY } from "../lib/constants";
import { addProductToCart, sumCartItemsCount, useCartItems } from "../lib/cart";

const CartPage: FC = () => {
  const router = useRouter();
  const { cartItems, amount } = useCartItems();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(sumCartItemsCount);
  }, []);

  const handleSubmit = () => {
    alert("注文が完了しました。");
    router.push("/");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Layout cartItemsCount={cartItemsCount}>
      <ul>
        {cartItems.map((item) => (
          <li /*className={styles.listItem}*/ key={item.product.id}>
            <img src={item.product.imageUrl} /*className={styles.image}*/ alt={item.product.description} />
            <div /*className={styles.itemContent}*/>
              <div>
                {item.product.name} {item.product.price}円
              </div>
              <div /*className={styles.quantity}*/>{item.quantity}個</div>
              <button onClick={() => addProductToCart(item.product)}>+</button>
              <button>-</button>
            </div>
          </li>
        ))}
      </ul>
      <div /*className={styles.amount}*/>合計: {amount}円</div>
      <div /*className={styles.orderButtonWrapper}*/>
        <button /*className={styles.orderButton}*/ onClick={handleSubmit}>注文する</button>
      </div>
    </Layout>
  );
};

export default CartPage;
