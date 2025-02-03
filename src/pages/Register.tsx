import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { registerUser } from "../features/authSlice";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const { name, email, password, confirmPassword, photo } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [firstAttempt, setFirstAttempt] = useState(false);

  // Handle input changes
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  // Validate on submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstAttempt(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const nameRegex = /^[a-zA-Z ]{3,}$/;

    // Validate Email
    setErrorEmail(!emailRegex.test(email));

    // Validate Name
    setErrorName(!nameRegex.test(name));

    // Validate Password
    setErrorPassword(!passwordRegex.test(password));

    if (
      emailRegex.test(email) &&
      nameRegex.test(name) &&
      passwordRegex.test(password) &&
      password === confirmPassword // Ensure passwords match
    ) {
      try {
        setIsLoading(true);

        // Upload image to Cloudinary (or other image storage service)
        let imageUrl = "";
        if (photo) {
          const formDataToUpload = new FormData();
          formDataToUpload.append("photo", photo);
          const response = await axios.post(
            "http://localhost:3123/api/v1/auth/upload", // Adjust to your actual backend route
            formDataToUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          imageUrl = response.data.imageUrl; // Ensure response contains imageUrl
        }

        // Register user with profile picture URL
        await dispatch(
          registerUser({
            name,
            email,
            password,
            confirmPassword,
            picture: imageUrl,
          })
        );

        // Redirect after successful registration
        navigate("/home");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="card">
      <section className="card-title">
        <Link to="/login" className="logo-register">
          <CiLogin />
        </Link>
        <h3>Create an Account</h3>
        <p>Register with your details</p>
      </section>
      <section className="card-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
              required
            />
            {errorName && (
              <small style={{ color: "red" }}>
                Please enter a valid name (at least 3 characters).
              </small>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
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
              type={showPassword ? "text" : "password"}
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
                Password must be at least 8 characters long, include uppercase
                and lowercase letters, a number, and a special character.
              </small>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              required
            />
            {confirmPassword !== password && firstAttempt && (
              <small style={{ color: "red" }}>Passwords do not match.</small>
            )}
          </div>

          <div className="form-group">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <button className="btn-login" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <span>or sign up with</span>
        <button className="btn-google">
          <FaGoogle className="google-icon" />
        </button>
      </section>
    </div>
  );
}
