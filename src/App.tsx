import { Route } from "wouter"
import { FormPreview } from "./form-preview/views"
import { SchemaBuilder } from "./schema-builder/views"
import { NavigationButtons } from "./shared/components"
import { FormNameForm } from "./shared/components/Sandbox"
import { NAV_URLS } from "./shared/constants"

const App = () => (
  <main className="p-4">
    <Route path={NAV_URLS.SCHEMA_BUILDER} component={SchemaBuilder} />
    <Route path={NAV_URLS.FORM_PREVIEW} component={FormPreview} />
    <Route path="/sandbox" component={FormNameForm} />
    <NavigationButtons />
  </main>
)

export default App
