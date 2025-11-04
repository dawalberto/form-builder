import { Link, Route, useLocation } from "wouter"
import { RegularFormInternalState } from "./internal-state"
import { RegularFormURLState } from "./url-state"

export const RegularForm = () => {
  const [location] = useLocation()

  return (
    <div className="space-y-4">
      {/* <h2 className="text-xl font-semibold">Regular Form</h2> */}

      <nav className="flex gap-4 border-b pb-2">
        <Link
          href="/sandbox/regular-form/internal-state"
          className={location.endsWith("/internal-state") ? "font-bold text-blue-600" : ""}
        >
          Internal State
        </Link>
        <Link
          href="/sandbox/regular-form/url-state"
          className={location.endsWith("/url-state") ? "font-bold text-blue-600" : ""}
        >
          URL State
        </Link>
      </nav>

      <div className="pt-4">
        <Route path="/sandbox/regular-form/internal-state" component={RegularFormInternalState} />
        <Route path="/sandbox/regular-form/url-state" component={RegularFormURLState} />
        <Route path="/sandbox/regular-form">
          <p>Selecciona una subvista del Regular Form.</p>
        </Route>
      </div>
    </div>
  )
}
