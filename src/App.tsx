import { Route } from "wouter"
import { SchemaBuilder } from "./schema-builder/views/schema-builder"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
  </main>
)

export default App
