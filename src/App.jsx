import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Crypto from "./Components/Crypto.jsx";
import Wallet from "./Components/Wallet";
import { Provider } from "react-redux";
import { store } from "./redux/store.js"
import Home from "./Components/Home.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/crypto",
          element: <Crypto />,
        },
        {
          path: "/wallet",
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
