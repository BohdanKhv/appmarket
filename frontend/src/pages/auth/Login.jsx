import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetUser } from '../../features/user/userSlice';
import { Input, Button } from '../../components';
import { spinnerIcon } from '../../assets/img/icons';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.user);

    useEffect(() => {
        if (isSuccess || user) {
            navigate(`/`);
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

        if (email === '' || password === '') {
            return;
        } else {
            const userData = {
                email,
                password
            };

            dispatch(login(userData));
        }
    };


    return (
        <main className="content mt-5">
            <div className="mx-w-sm mx-auto bg-main box-shadow border-radius px-3 py-5">
                <div>
                    <h3 className="fs-2 weight-normal text-center pb-5">
                        Sign in
                    </h3>
                </div>
                <div>
                    <div>
                        <div className="py-2">
                            <Input
                                type="text"
                                name="email"
                                label="Email"
                                value={email}
                                onChange={onChange}
                                autoComplete={true}
                            />
                        </div>
                        <div className="py-2">
                            <Input
                                type="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={onChange}
                                autoComplete={true}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSubmit();
                                    }
                                }}
                            />
                        </div>
                        <Button
                            color={email.length > 0 && password.length > 0 ? 'primary' : 'disabled'}
                            className={`btn w-100 mt-3 mb-3`}
                            disabled={!(email.length > 0 && password.length > 0) || isLoading}
                            loading={isLoading}
                            onClick={onSubmit}
                        >
                            Log in
                        </Button>
                        {isError && <div className="text-danger mt-1 bg-err">{msg}</div>}
                    </div>
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