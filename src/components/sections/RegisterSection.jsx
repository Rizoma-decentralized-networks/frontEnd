export default function RegisterSection() {
  return (
    <>
      <input
        type="text"
        className="input validator"
        required
        placeholder="Username"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        minlength="3"
        maxlength="30"
        title="Only letters, numbers or dash"
      />
      <p className="validator-hint">
        Debe tener entre 3 y 30 caracteres
        <br />y contener únicamente letras, números o guiones.
      </p>
      <input
        className="input validator"
        type="email"
        required
        placeholder="mail@site.com"
      />
      <div className="validator-hint">
        Ingrese una dirección de correo electrónico válida
      </div>
      <input
        type="password"
        className="input validator"
        required
        placeholder="Password"
        minlength="8"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
      />
      <p className="validator-hint">
        Must be more than 8 characters, including
        <br />
        At least one number
        <br />
        At least one lowercase letter
        <br />
        At least one uppercase letter
      </p>
    </>
  );
}
