import { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { getProductItem } from "../../lib/product";
import { Product } from "../../lib/types";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { STORAGE_KEY } from "../../lib/constants";
import { addProductToCart, sumCartItemsCount } from "../../lib/cart";

const ProductPage: FC = () => {
  const [productItem, setProductItem] = useState<Product | undefined>();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const router = useRouter();
  const id = router.query.id ? String(router.query.id) : null;

  useEffect(() => {
    if (id === null) return;
    getProductItem(id).then((product) => setProductItem(product));
    setCartItemsCount(sumCartItemsCount);
  }, [id]);

  return (
    <Layout cartItemsCount={cartItemsCount}>
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
            <button onClick={() => addProductToCart(productItem)}>カートに追加する</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
