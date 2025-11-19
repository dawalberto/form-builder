import { Route } from "wouter"
import { SchemaBuilder } from "./schema-builder/views/schema-builder"
import { DynamicForm } from "./views/dynamic-form"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
    <Route path="/dynamic-form" component={DynamicForm} />
  </main>
)

export default App
