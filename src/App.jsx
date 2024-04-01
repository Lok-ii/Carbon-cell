import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Population from "./Components/Population";
import Layout from "./Components/Layout";
import Crypto from "./Components/Crypto";
import Wallet from "./Components/Wallet";
import { Provider } from "react-redux";
import { store } from "./redux/store.js"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Population />,
        },
        {
          path: "crypto",
          element: <Crypto />,
        },
        {
          path: "wallet",
          element: <Wallet />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
