'use client';

import Image from 'next/image';

import cookie from 'js-cookie';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';

import { onGetUser } from './utils';

import styles from '../styles/admin/election-management.module.scss';

import Spinner from '../../public/icons/loading.png';

import ShowPasswordBtn from '@/../public/icons/visible.png';
import HidePasswordBtn from '@/../public/icons/hide.png';

type FormMessage = {
  message: string;
  ok: boolean;
};

/**
 * @memberof '/', '/admin/login' page
 * @returns JSX for Login form
 */

function Login() {
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<FormMessage>({
    message: '',
    ok: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    cookie.set('token', '');
    cookie.set('isLoggedIn', '');
    cookie.set('userID', '');
  }, []);

  // * VOTER'S ID SAMPLE: EMP-2023-MS-12345
  // * In this format, "EMP" stands for "Employee," "2023" indicates the year of hire, "MS" represents the department code for Marketing, and "12345" is a unique numerical identifier for the employee within the department.

  //  * Password: EMP@20M23S#12345
  //  * In this example, we have taken the "EMP" part from the ID, followed by the last two digits of the "2023" year (20 and 23), the first letter of the department "MS" (M), and the unique identifier "12345." To increase complexity, we have inserted special characters "@" and "#."

  const userSchema = Yup.object().shape({
    userID: Yup.string().required(),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required(),
  });

  const onShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onFormSubmitHandler = async (values: any, actions: any) => {
    setShowSpinner(true);
    setFormMessage({
      message: '',
      ok: false,
    });

    const data = await onGetUser(values);

    setShowSpinner(false);
    setFormMessage({
      message: data.message,
      ok: data.ok,
    });

    if (data.userID) {
      cookie.set('token', data.token);
      cookie.set('isLoggedIn', 'true');
      cookie.set('userID', data.userID);

      if (data.role === 'voter') {
        router.push('/vote/sessions');
      } else if (data.role === 'admin') {
        router.push('/admin/sessions');
      }
    }
  };

  return (
    <section className={styles.form}>
      <h2 className={formMessage.ok ? '' : styles['form--error']}>
        {formMessage.message}
      </h2>
      {showSpinner && (
        <span className={styles.spinner}>
          <Image
            src={Spinner}
            alt='icon'
            className={`${styles['spinner-icon']} ${styles['form--spinner']}`}
          />
        </span>
      )}
      <Formik
        initialValues={{
          userID: '',
          password: '',
        }}
        onSubmit={(values, actions) => onFormSubmitHandler(values, actions)}
        validationSchema={userSchema}
        // validateOnChange={false}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div
              className={`${styles['title--container']} ${styles['form--field__container']}`}
            >
              <h3>User&apos;s ID</h3>

              <input
                type='text'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder='Enter an ID'
                name='userID'
                value={props.values.userID}
                title='userID'
              />
              <p className={styles.error}>
                <ErrorMessage name='userID' />
              </p>
            </div>

            <div
              className={`${styles['title--container']} ${styles['form--field__container']}`}
            >
              <h3>Password</h3>
              <div className={styles['password--container']}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  placeholder='Enter the password'
                  name='password'
                  value={props.values.password}
                  title='name'
                />

                <Image
                  src={!showPassword ? ShowPasswordBtn : HidePasswordBtn}
                  alt='Icon'
                  className={styles['password--icon']}
                  onClick={() => onShowPasswordHandler()}
                />
              </div>

              <p className={styles.error}>
                <ErrorMessage name='password' />
              </p>
            </div>

            <button type='submit' className={styles['btn']}>
              <p>Submit</p>
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
}

export default Login;
