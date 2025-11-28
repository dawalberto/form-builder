import { Route } from "wouter"
import { SchemaBuilder } from "./schema-builder/views/schema-builder"
import { PersonForm } from "./views/sandbox"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
    <Route path="/sandbox" component={PersonForm} />
  </main>
)

export default App
