import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phone: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Lösenordet matchar inte.");
      return;
    }

    try {
      await registerUser(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        postalCode: formData.postalCode,
        phone: formData.phone,
        username: formData.username,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Något gick fel vid registrering.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">
        Skapa konto
      </h2>

      {success ? (
        <div className="text-center">
          <p className="text-green-600 text-lg font-semibold mb-6">
            Välkommen {formData.firstName}! Ditt konto har skapats.
          </p>
          <button onClick={handleBack} className="btn btn-success">
            Tillbaka
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              name="firstName"
              placeholder="Förnamn"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              name="lastName"
              placeholder="Efternamn"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <input
            name="username"
            placeholder="Användarnamn"
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-post"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Lösenord"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Bekräfta lösenord"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="address"
            placeholder="Adress"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="postalCode"
            placeholder="Postnummer"
            value={formData.postalCode}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="phone"
            placeholder="Telefonnummer"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Registrera
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
