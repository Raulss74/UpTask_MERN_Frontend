import Modal from 'react-modal'; // Importamos react-modal
import useProyectos from '../hooks/useProyectos';

// Configurar el app element (esto es necesario para accesibilidad)
Modal.setAppElement('#root');

const ModalEliminarColaborador = () => {
    const { modalEliminarColaborador, handleModalEliminarColaborador, eliminarColaborador  } = useProyectos();   

    return (
        <Modal
            isOpen={modalEliminarColaborador}
            onRequestClose={handleModalEliminarColaborador}
            contentLabel="Confirmar eliminación"
            className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        >
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-xl w-full sm:w-96 p-6 relative">
                {/* Cerrar botón */}
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={handleModalEliminarColaborador}
                >
                    <span className="sr-only">Cerrar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>

                <h3 className="text-lg font-bold text-gray-900">Eliminar colaborador</h3>
                <div className="mt-2">
                    <p className='text-sm text-gray-500'></p>
                    Una vez eliminada, esta persona no podrá acceder al proyecto.
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                    {/* Botón Cancelar */}
                    <button
                       onClick={handleModalEliminarColaborador}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Cancelar
                    </button>
                    {/* Botón Eliminar */}
                    <button
                        onClick={eliminarColaborador}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEliminarColaborador;
