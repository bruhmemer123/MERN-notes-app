import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        const success = await signup(data);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Username</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    className="input input-bordered w-full pl-10"
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    required
                                />
                                <UserIcon className="size-5 absolute left-3 top-3.5 text-base-content/40" />
                            </div>
                        </div>

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
                                    placeholder="At least 8 characters"
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
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <LoaderIcon className="size-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/70 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="link link-primary font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
