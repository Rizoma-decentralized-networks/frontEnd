export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Crear iniciativa</a>
          </li>
          <li>
            <details>
              <summary>Iniciar Sesión</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Login</a>
                </li>
                <li>
                  <a>Registro</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
