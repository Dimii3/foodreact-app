import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
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
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
