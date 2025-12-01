import { Route } from "wouter"
import styles from "@/styles/sakura.module.css"
import { SchemaBuilder } from "./schema-builder/views/schema-builder"
import { PersonForm } from "./views/sandbox"

const App = () => (
  <main className="p-4">
    <Route path="/" component={SchemaBuilder} />
    <Route
      path="/sandbox"
      component={() => (
        <div className={styles.wrapper}>
          <PersonForm />
        </div>
      )}
    />
  </main>
)

export default App
