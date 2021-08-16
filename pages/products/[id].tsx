import { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { getProductItem, Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";

const ProductPage: FC = () => {
  const [productItem, setProductItem] = useState<Product | undefined>();

  const router = useRouter();
  const id = String(router.query.id);

  useEffect(() => {
    getProductItem(id).then((product) => setProductItem(product));
  }, [id]);

  const addCartItem = () => {
    if (productItem !== undefined) {
      /*presentCartItems.forEach((cartItem) => {
        if (cartItem.product.id === productItem.id) {
          cartItem.quantity += 1;
        }
      });*/
      localStorage.setItem("presentCartItems", JSON.stringify([{ product: productItem, quantity: 1 }]));
    }
  };

  return (
    <Layout>
      <div className={"productWrapper"}>
        {productItem === undefined ? (
          <p>製品が見つかりませんでした。IDを確認してください。</p>
        ) : (
          <div>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={productItem.imageUrl} alt={`${productItem.name}の写真`} />
              <div className={styles.price}>{productItem.price}円</div>
            </div>
            <div className={styles.productName}>{productItem.name}</div>
            <div>{productItem.description}</div>
            <button onClick={addCartItem}>カートに追加する</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
