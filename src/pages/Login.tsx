import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store.js";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { loginUser } from "../features/authSlice.js";
import { useAppDispatch, useAppSelector } from "../utilities/hooks.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [firstAttempt, setFirstAttempt] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get the loading and user data from Redux state
  const { status, user } = useAppSelector((state: RootState) => state.user);
  const isLoading = status === "loading";

  const handleShowPassword = (prev: boolean) => {
    !prev;
  };

  useEffect(() => {
    if (status === "succeeded" || user.token) {
      // If the user is logged in, redirect to the home page
      navigate("/home");
    }

    if (firstAttempt) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }

      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (
        password.length < minLength ||
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumber ||
        !hasSpecialChar
      ) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
  }, [status, user, email, password, firstAttempt, navigate]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    setFirstAttempt(true);
    if (password) {
      console.log(password);
    }
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="card">
          <section className="card-title">
            <Link to="/register" className="logo-register">
              <CiLogin />
            </Link>
            <h3>Sign in with email</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              eum.
            </p>
          </section>
          <section className="card-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder={`Email`}
                  required
                />
                {errorEmail && (
                  <small style={{ color: "red" }}>
                    Please enter a valid email address.
                  </small>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {errorPassword && (
                  <small style={{ color: "red" }}>
                    Password must be at least 8 characters long, and include
                    uppercase and lowercase letters, a number, and a special
                    character.
                  </small>
                )}
              </div>
              <p>
                <Link className="forgot-password" to="/forgot-password">
                  Forgot password?
                </Link>
              </p>
              <div className="form-group">
                <button className="btn-login">Get Started</button>
              </div>
            </form>
            <span>or sign in with</span>
            <button className="btn-google">
              <FaGoogle className="google-icon" />
            </button>
          </section>
        </div>
      )}
    </>
  );
}
