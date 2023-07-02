import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {

    e.preventDefault();    

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords no son iguales',
        error: true
      })
      return
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto. Agrega mínimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    //Crear el usuario en la API
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password
      });
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('');
      setPassword('');
      setEmail('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta</h1>

      {msg && <Alerta alerta={alerta} />} 

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
      <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="nombre"
            >Nombre</label>
            <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email"
            >Email</label>
            <input
                id="email"
                type="email"
                placeholder="Email de registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
            >Password</label>
            <input
                id="password"
                type="password"
                placeholder="Password de registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password2"
            >Repetir Password</label>
            <input
                id="password2"
                type="password"
                placeholder="Repetir tu password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>
        <input
            type="submit"
            value="Crear cuenta"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer
                       hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
        >¿Ya tienes una cuenta? Inicia sesión</Link>
        <Link
            to="/olvide-password"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Registrar
