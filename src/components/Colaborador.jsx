import useProyectos from "../hooks/useProyectos"

// eslint-disable-next-line react/prop-types
const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProyectos()

    // eslint-disable-next-line react/prop-types
    const { nombre, email } = colaborador

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p>{nombre}</p>
            <p className="text-sm text-gray-700">{email}</p>
        </div>

        <div>
            <button
                type="button"
                className="bg-red-600 px-4 py-3 text-white uppercas font-bold text-sm rounded-lg"
                onClick={() => handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>

        </div>        
    </div>
  )
}

export default Colaborador
