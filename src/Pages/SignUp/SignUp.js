import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
const SignUp = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const {createUser, updateUser} = useContext(AuthContext);
    const [signUpError, setSignupError] = useState('');

    const handleSignup = (data) => {
        console.log(data);
        setSignupError('');
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            toast('user created successfully')
            const userInfo = {
                displayName : data.name
            }
            updateUser(userInfo)
            .then(()=>{})
            .catch(err=> console.error(err))
        })
        .catch(error =>{
            console.error(error)
            setSignupError(error)
        })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text-alt">Name</span></label>
                        <input type="text"
                            {...register('name', {
                                required: 'Name is required'
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' >{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text-alt">Email</span></label>
                        <input type="email"
                            {...register('email', {
                                required: 'email is required',
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text-alt">Password</span></label>
                        <input type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 character or longer' },
                                pattern:{value:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message:'Password must be number uppercase lowercase and special character'}
                            })}
                            className="input input-bordered 
                        w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-accent mt-4 w-full' value='Signup' type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link to='/login' className='text-secondary'>Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;