import { Route } from "wouter"
import { DynamicForm } from "./views/dynamic-form"
import { SchemaBuilder } from "./views/schema-builder"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
    <Route path="/dynamic-form" component={DynamicForm} />
  </main>
)

export default App
