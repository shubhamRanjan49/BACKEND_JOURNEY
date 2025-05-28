import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            alert("You must agree to the terms of service.");
            return;
        }

        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3001/register", {
                name,
                email,
                password,
            });
            alert("User registered successfully!");
            console.log("Success:", response.data);
        } catch (error) {
            alert("Registration failed.");
            console.error("Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} required />
                                            <label className="form-label">Your Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            <label className="form-label">Your Email</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type={showPassword ? "text" : "password"} className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <label className="form-label">Password</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type={showPassword ? "text" : "password"} className="form-control form-control-lg" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                                            <label className="form-label">Repeat Password</label>
                                        </div>

                                        <div className="form-check mb-4">
                                            <input type="checkbox" className="form-check-input" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                                            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-4">
                                            <input className="form-check-input me-2" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                                            <label className="form-check-label">I agree to the <a href="#!"><u>Terms of service</u></a></label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg" disabled={loading}>
                                                {loading ? "Registering..." : "Register"}
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Already have an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
