import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router";
import { LoaderIcon, LockIcon, MailIcon } from "lucide-react";

const LoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(data);
        if (success) {
            navigate("/")
        }
    };
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">
                        Welcome Back
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full pl-10"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    required
                                />
                                <MailIcon className="size-5 absolute left-3 top-3.5 text-base-content/40" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-10"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    required
                                />
                                <LockIcon className="size-5 absolute left-3 top-3.5 text-base-content/40" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-2"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <LoaderIcon className="size-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>
                    <p className="text-center text-sm text-base-content/70 mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link link-primary font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;