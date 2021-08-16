import { graphqlRequest } from "./graphqlClient";
import { Product } from "./types";

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const productItemQuery = `
  query productItem($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

export async function getProductItem(id: String): Promise<Product> {
  const data = await graphqlRequest({ query: productItemQuery, variables: { id: id } });
  return data.product;
}
