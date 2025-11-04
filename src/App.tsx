import { Route } from "wouter"
import { Sandbox } from "./views/sandbox/sandbox"

const App = () => (
  <main className="p-4">
    <Route path="/" component={() => <h1>Home</h1>} />
    <Route path="/sandbox" component={Sandbox} />
    <Route path="/sandbox/*" component={Sandbox} />
  </main>
)

export default App
