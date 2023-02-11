import { useCallback } from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from '@/styles/Login.module.css';
import { AuthService } from '@/services/auth.service';

interface IFormValues {
    email: string;
    password: string;
}

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const initialValues: IFormValues = {
    email: '',
    password: '',
};

function Login() {
    const onSubmit = useCallback(async (values: IFormValues) => {
        try {
            await AuthService.login(values.email, values.password);
            await Router.push('/');
        } catch (error) {
            alert(error);
        }
    }, []);

    const formik = useFormik<IFormValues>({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='email'>
                        Email:
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.error}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='password'>
                        Password:
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;
