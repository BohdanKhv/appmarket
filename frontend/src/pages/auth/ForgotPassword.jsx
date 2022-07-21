import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, resetUser } from '../../features/user/userSlice';
import { Input } from '../../components';
import { spinnerIcon } from '../../assets/img/icons';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            navigate(`/${user.username}`);
        }
    }, [user, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = 'Fask.me | Forgot Password';

        return () => {
            dispatch(resetUser());
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            return;
        } else {
            dispatch(forgotPassword({ email }));
        }
    };


    return (
        <main className="container">
            <div className="form-header">
                <h1 className="title-1 text-center py-1">
                    Forgot Password?
                </h1>
                <p className="title-3 text-secondary text-center pb-1 px-1">
                    Enter your email address and we will send you a link to reset your password.
                </p>
            </div>
            <div className="auth-form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {isSuccess ? (
                        <div className="mt-1 success-msg">{msg}</div>
                    ) : (
                        <button type="submit" 
                            className={`btn w-100 spinner${email ? ' btn-primary' : ' btn-secondary'}`}
                        >
                            {isLoading ? spinnerIcon : 'Send Reset Link'}
                        </button>
                    )}
                    {isError && <div className="text-danger mt-1 bg-err">{msg}</div>}
                </form>
                <p className="mt-1 text-end">
                    Back to <NavLink className="text-hover" to="/login">Log in</NavLink>
                </p>
            </div>
        </main>
    )
}

export default ForgotPassword