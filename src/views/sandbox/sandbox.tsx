import { Link, Route, useLocation } from "wouter"
import { BuildFormSchema } from "./build-form-schema"
import { MultiStepForm } from "./multi-step-form"
import { MultiTabForm } from "./multi-tab-form"
import { RegularForm } from "./regular-form/regular-form"

export const Sandbox = () => {
  const [location] = useLocation()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sandbox</h1>

      <nav className="flex gap-4 border-b pb-2">
        <Link
          href="/sandbox/regular-form"
          className={location.includes("regular-form") ? "font-bold text-blue-600" : ""}
        >
          Regular Form
        </Link>
        <Link
          href="/sandbox/multi-step-form"
          className={location.includes("multi-step-form") ? "font-bold text-blue-600" : ""}
        >
          Multi-step Form
        </Link>
        <Link
          href="/sandbox/multi-tab-form"
          className={location.includes("multi-tab-form") ? "font-bold text-blue-600" : ""}
        >
          Multi-tab Form
        </Link>
        <Link
          href="/sandbox/build-form-schema"
          className={location.includes("build-form-schema") ? "font-bold text-blue-600" : ""}
        >
          Build Form Schema
        </Link>
      </nav>

      <div className="pt-4 px-8">
        <Route path="/sandbox/regular-form" component={RegularForm} />
        <Route path="/sandbox/regular-form/*" component={RegularForm} />
        <Route path="/sandbox/multi-step-form" component={MultiStepForm} />
        <Route path="/sandbox/multi-tab-form" component={MultiTabForm} />
        <Route path="/sandbox/build-form-schema" component={BuildFormSchema} />
        <Route path="/sandbox">
          <p>Selecciona una opción del menú.</p>
        </Route>
      </div>
    </div>
  )
}
