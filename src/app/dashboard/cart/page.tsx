import { WidgetItem } from "@/dashboard/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components";
import { cookies } from "next/headers";

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];
  for (const id in cart) {
    const product = products.find((item) => item.id === id);
    if (!product) continue;
    productsInCart.push({ product, quantity: cart[id] });
  }
  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const productsInCart = getProductInCart(cart);

  const totalToPay: number = productsInCart.reduce(
    (prev, current) => prev + current.quantity * current.product.price,
    0
  );

  return (
    <div>
      <h1>Products in the cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard product={product} quantity={quantity} key={product.id} />
          ))}
        </div>
        <div className="flex flex-col sm:w-4/12 w-full">
          <WidgetItem title="Total to pay">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuesto 15%
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
