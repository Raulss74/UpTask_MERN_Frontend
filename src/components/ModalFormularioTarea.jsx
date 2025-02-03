import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import useProyectos from "../hooks/useProyectos"
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const PRIORIDAD = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = () => {
  const [id, setId] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaEntrega, setFechaEntrega] = useState("")
  const [prioridad, setPrioridad] = useState("")

  const params = useParams()
  
  const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos()

  useEffect(() => {
    if (tarea?._id) {
      setId(tarea._id)
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion)  
      setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
      setPrioridad(tarea.prioridad)
      return
    }
    setId('')
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setPrioridad('')
  }, [tarea])

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligaroios', 
        error: true
      })
      return
    }    
    await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id})

    setId('')
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setPrioridad('')
  }

  const { msg } = alerta 

  return (
    <Transition show={modalFormularioTarea} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalTarea}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleModalTarea}
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-gray-900"
                      >
                        {id ? 'Editar tarea' : 'Crear tarea'}
                      </Dialog.Title>

                      {msg && <Alerta alerta={alerta} />}

                      <form                       
                        onSubmit = {handleSubmit}
                        className="my-10"                        
                      >
                        <div className="mb-5">
                          <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="nombre"
                          >
                            Nombre tarea
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre de la tarea"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="descripicion"
                          >
                            Descripción tarea
                          </label>
                          <textarea
                            id="descripcion"
                            placeholder="Descripción de la tarea"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="fecha-entrega"
                          >
                            Fecha entrega
                          </label>
                          <input
                            type="date"
                            id="fecha-entrega"                            
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="prioridad"
                          >
                            Prioridad
                          </label>
                          <select                            
                            id="prioridad"                            
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {PRIORIDAD.map(opcion => (
                              <option key={opcion}>{opcion}</option>
                            ))}
                          </select>
                        </div>
                        <input 
                          type="submit"
                          className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                          value={ id ? 'Gurdar cambios' : 'Crear tarea' }
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalFormularioTarea
