import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/UI/Checkout";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/userProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header></Header>
          <Meals></Meals>
          <Cart></Cart>
          <Checkout></Checkout>
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
