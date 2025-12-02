import { Route } from "wouter"
import { FormPreview } from "./form-preview/views"
import { SchemaBuilder } from "./schema-builder/views/schema-builder"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
    <Route path="/form-preview" component={FormPreview} />
  </main>
)

export default App
