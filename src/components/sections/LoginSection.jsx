import { Link } from 'react-router';

export default function LoginSection() {
    return (
        
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Start creating your own initiatives!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-primary mt-4">Login</button>
                <div className="text-xs text-gray-500 align-center mt-6">Don't have an account? <Link to="/register" className="text-secondary hover:text-primary-focus">Register</Link></div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
}