import { Link } from 'react-router';

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src="/logoRizoma.png" alt="LogoRizoma" className="h-8" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/post-mark">Crear iniciativa</Link>
          </li>
          <li>
            <details>
              <summary>Iniciar Sesión</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link to="/login">Login</Link>  
                </li>
                <li>
                  <Link to="/register">Registro</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
