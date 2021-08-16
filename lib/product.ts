import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

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
  query productItem($id: String!) {
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
  const data = await graphqlRequest({ query: productItemQuery, variables: id });
  return data.product;
}
