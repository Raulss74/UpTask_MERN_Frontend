import { useState, useEffect, createContext } from 'react'
//import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    //const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async() => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Context-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                //navigate('/proyectos')
            } catch (error) {
                setAuth({})
                console.log(error);
            } finally {
                setCargando(false);
            }
            
        }
        autenticarUsuario()    
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext;