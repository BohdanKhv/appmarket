import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetUser } from '../../features/user/userSlice';
import { Input } from '../../components';
import { spinnerIcon } from '../../assets/img/icons';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.user);

    useEffect(() => {
        if (isSuccess || user) {
            navigate(`/${user.username}`);
        }
    }, [user, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = ' | Login';

        return () => {
            dispatch(resetUser());
        }
    }, [])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            return;
        } else {
            const userData = {
                username,
                password
            };

            dispatch(login(userData));
        }
    };


    return (
        <main className="content pt-5">
            <div className="mx-w-sm mx-auto bg-main box-shadow border-radius px-3 py-5">
                <div>
                    <h3 className="fs-2 weight-normal text-center pb-5">
                        Sign in
                    </h3>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="py-2">
                            <Input
                                type="text"
                                name="username"
                                label="Email"
                                value={username}
                                onChange={onChange}
                                autoCompleteOn={true}
                            />
                        </div>
                        <div className="py-2">
                            <Input
                                type="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" 
                            className={`btn w-100 mt-3 mb-3 spinner${username.length > 0 && password.length > 0 ? ' btn-primary' : ' btn-secondary'}`}
                        >
                            {isLoading ? spinnerIcon : 'Log in'}
                        </button>
                        {isError && <div className="text-danger mt-1 bg-err">{msg}</div>}
                    </form>
                    <NavLink to="/auth/forgot-password" className="text-hover text-primary">
                        Forgot password?
                    </NavLink>
                    <p className="mt-1 text-end">
                        Don't have an account? <NavLink className="text-hover text-primary" to="/auth/register">Create One</NavLink>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login