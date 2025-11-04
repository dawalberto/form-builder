export const RegularFormInternalState = () => {
  type Form = {
    personalData: {
      fullName: string
      search: string
      email: string
      phone: string
      website: string
      password: string
    }
    identifiersAndMeasures: {
      number: number | null
      range: number | null
      color: string
      file: File | null
    }
    dateAndTime: {
      date: string
      month: string
      week: string
      time: string
      dateTimeLocal: string
    }
    optionsAndSelection: {
      checkboxes: string[]
      radio: string | null
      usage: string
      counter: string
      observations: string
    }
  }

  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Regular Form - Internal State 📝</h1>

      <form className="space-y-6" action="#" method="post" encType="multipart/form-data" noValidate>
        <input type="hidden" name="form_id" value="registro-terreno-001" />

        <fieldset className="border rounded p-4">
          <legend className="font-medium">Datos personales</legend>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="nombre" className="block text-sm">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Ej. María Pérez"
                className="mt-1 block w-full p-2 border rounded"
                aria-describedby="nombre-help"
              />
              <p id="nombre-help" className="sr-only">
                Introduce tu nombre y apellidos.
              </p>
            </div>

            <div>
              <label htmlFor="busqueda" className="block text-sm">
                Búsqueda (search)
              </label>
              <input
                id="busqueda"
                name="busqueda"
                type="search"
                placeholder="Buscar..."
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@dominio.com"
                className="mt-1 block w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+34 600 000 000"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="web" className="block text-sm">
                Página web
              </label>
              <input
                id="web"
                name="web"
                type="url"
                placeholder="https://"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="clave" className="block text-sm">
                Contraseña
              </label>
              <input
                id="clave"
                name="clave"
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-4">
          <legend className="font-medium">Identificadores y medidas</legend>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="numero" className="block text-sm">
                Número
              </label>
              <input
                id="numero"
                name="numero"
                type="number"
                min="0"
                step="1"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="rango" className="block text-sm">
                Rango
              </label>
              <input
                id="rango"
                name="rango"
                type="range"
                min="0"
                max="100"
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-6 w-full"
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm">
                Color preferido
              </label>
              <input
                id="color"
                name="color"
                type="color"
                defaultValue="#000000"
                className="mt-1 block w-20 h-10 p-0 border rounded"
              />
            </div>

            <div>
              <label htmlFor="archivo" className="block text-sm">
                Adjuntar archivo (file)
              </label>
              <input
                id="archivo"
                name="archivo"
                type="file"
                accept="image/*,.pdf"
                className="mt-1 block w-full"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-4">
          <legend className="font-medium">Fechas y hora</legend>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="fecha" className="block text-sm">
                Fecha (date)
              </label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="mes" className="block text-sm">
                Mes (month)
              </label>
              <input
                id="mes"
                name="mes"
                type="month"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="semana" className="block text-sm">
                Semana (week)
              </label>
              <input
                id="semana"
                name="semana"
                type="week"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="hora" className="block text-sm">
                Hora (time)
              </label>
              <input
                id="hora"
                name="hora"
                type="time"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="fecha-hora" className="block text-sm">
                Fecha y hora local (datetime-local)
              </label>
              <input
                id="fecha-hora"
                name="fecha_hora"
                type="datetime-local"
                className="mt-1 block w-full p-2 border rounded"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-4">
          <legend className="font-medium">Opciones y selección</legend>
          <div className="mt-4 space-y-3">
            <div>
              <span className="block text-sm">Checkboxes</span>
              <div className="flex gap-4 mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="opt[]" value="agua" className="mr-2" />
                  Agua
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="opt[]" value="luz" className="mr-2" />
                  Luz
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="opt[]" value="gas" className="mr-2" />
                  Gas
                </label>
              </div>
            </div>

            <div>
              <span className="block text-sm">Radios</span>
              <div className="flex gap-4 mt-2" role="radiogroup" aria-labelledby="radio-legend">
                <label className="inline-flex items-center">
                  <input type="radio" name="propietario" value="si" className="mr-2" />
                  Soy propietario
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="propietario" value="no" className="mr-2" />
                  No soy propietario
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="select-uso" className="block text-sm">
                Uso del suministro
              </label>
              <select id="select-uso" name="uso" className="mt-1 block w-full p-2 border rounded">
                <option value="domestico">Doméstico</option>
                <option value="agrario">Agrario</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label htmlFor="contador" className="block text-sm">
                Número de contador (datalist)
              </label>
              <input
                id="contador"
                name="contador"
                list="contadores"
                placeholder="Selecciona o escribe"
                className="mt-1 block w-full p-2 border rounded"
              />
              <datalist id="contadores">
                <option value="1234567" />
                <option value="7654321" />
                <option value="0001112" />
              </datalist>
            </div>

            <div>
              <label htmlFor="observaciones" className="block text-sm">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                rows={4}
                className="mt-1 block w-full p-2 border rounded"
                placeholder="Añade comentarios..."
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-4">
          <legend className="font-medium">Controles finales</legend>
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" className="px-4 py-2 rounded border">
              Enviar
            </button>
            <button type="reset" className="px-4 py-2 rounded border">
              Limpiar
            </button>
            <button type="button" className="px-4 py-2 rounded border">
              Botón (type=button)
            </button>
            <input
              type="image"
              src="data:image/png;base64,iVBORw0KGgo="
              alt="Enviar como imagen"
              className="w-10 h-10 inline-block"
              aria-hidden="true"
            />
          </div>
        </fieldset>
      </form>
      <footer className="mt-6 text-sm text-slate-600">
        Formulario de ejemplo — construido con elementos nativos y markup accesible.
      </footer>
    </main>
  )
}
