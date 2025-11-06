import { Route } from "wouter"
import { FormBuilder } from "./views/form-builder"

const App = () => (
  <main className="p-4">
    <Route path="/" component={FormBuilder} />
  </main>
)

export default App
