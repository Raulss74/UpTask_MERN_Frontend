import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {    
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        // Verifica si el mensaje es el esperado
        if (data.msg === "Usuario confirmado correctamente.") {
          setAlerta({
            msg: data.msg,
            error: false,
          });
          setCuentaConfirmada(true);
        } else {
          // Solo establecer el mensaje de error si la cuenta no ha sido confirmada
          if (!cuentaConfirmada) {
            setAlerta({
              msg: "Token no válido",
              error: true,
            });
          }
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setAlerta({
          msg: error.response?.data?.msg || "Error inesperado",
          error: true,
        });
      }
    };

    confirmarCuenta();
  }, [id, cuentaConfirmada]); // Agregar cuentaConfirmada como dependencia

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link 
            className='block text-center my-5 text-slate-500 uppercase text-sm' 
            to="/" >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;