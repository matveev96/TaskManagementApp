import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { HashRouter } from "react-router"
import App from "./app/App"

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
