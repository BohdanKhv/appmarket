import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetUser } from '../../features/user/userSlice';
import { Input, Button } from '../../components';
import { spinnerIcon } from '../../assets/img/icons';


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const { email, fullName, password } = formData;
    const [ clientErr, setClientErr ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.user);

    useEffect(() => {
        if (isError) {
            console.log(msg);
        }

        if (isSuccess || user) {
            navigate('/');
        }
    }, [user, isError, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = '| Register';

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

        if (email === '' || password === '' || fullName === '') {
            setClientErr('All fields are required');
            return;
        } else if (fullName.length < 3) {
            setClientErr('Full name must be at least 3 characters long');
            return;
        } else if (password.length < 6) {
            setClientErr('Password must be at least 6 characters long');
            return;
        } else {
            const userData = {
                email,
                fullName,
                password,
            };

            setClientErr('');
            dispatch(register(userData));
        }
    };


    return (
        <main className="content pt-5">
            <div className="mx-w-sm mx-auto bg-main box-shadow border-radius px-3 py-5">
                <div>
                    <h3 className="fs-2 weight-normal text-center pb-5">
                        Create an account
                    </h3>
                </div>
                <div onSubmit={onSubmit}>
                    <div className="py-2">
                        <Input
                            type="text"
                            name="fullName"
                            label="Full name *"
                            value={fullName}
                            onChange={onChange}
                            maxLength={30}
                            minLength={3}
                        />
                    </div>
                    <div className="py-2">
                        <Input
                            type="email"
                            name="email"
                            label="Email *"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="py-2">
                        <Input
                            type="password"
                            name="password"
                            label="Password *"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <Button 
                        type="submit"
                        color={fullName.length > 0 && email.length > 0 && password.length > 0 ? 'primary' : 'disabled'}
                        className={`btn w-100 mt-3`}
                        disabled={!(fullName.length > 0 && email.length > 0 && password.length > 0) || isLoading}
                        loading={isLoading}
                        onClick={onSubmit}
                    >
                        Sign up
                    </Button>
                    {isError ? 
                        <div className="text-danger mt-1 bg-err">{msg}</div>
                    : clientErr ?
                        <div className="text-danger mt-1 bg-err">{clientErr}</div>
                    : null}
                </div>
                <p className="mt-4 text-end">
                    Already have an account? <NavLink className="text-hover text-primary" to="/auth/login">Log in</NavLink>
                </p>
            </div>
        </main>
    )
}

export default Register