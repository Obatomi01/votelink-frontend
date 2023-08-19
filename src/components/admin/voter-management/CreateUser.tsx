'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../../../styles/admin/election-management.module.scss';

import { onCreateNewUser } from '@/components/utils';

import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';

import Spinner from '../../../../public/icons/loading.png';
import {} from '@/components/SecuredAdminRoute';

import cookie from 'js-cookie';
import { getUserData } from '@/components/utils';

type FormMessage = {
  message: string;
  ok: boolean;
};

/**
 * @memberof CreateUserPage page
 * @returns JSX form for creating a user
 */
function CreateUser() {
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);

  const [formMessage, setFormMessage] = useState<FormMessage>({
    message: '',
    ok: false,
  });

  useEffect(() => {
    router.refresh();
  }, []);

  const onReloadHandler = async () => {
    const userID = cookie.get('userID');

    if (userID) {
      const { role } = await getUserData(userID);

      if (role !== 'admin') {
        router.refresh();
        return;
      }
    }
  };

  // * VOTER'S ID SAMPLE: EMP-2023-MS-12345
  // * In this format, "EMP" stands for "Employee," "2023" indicates the year of hire, "MS" represents the department code for Marketing, and "12345" is a unique numerical identifier for the employee within the department.

  //  * Password: EMP@20M23S#12345
  //  * In this example, we have taken the "EMP" part from the ID, followed by the last two digits of the "2023" year (20 and 23), the first letter of the department "MS" (M), and the unique identifier "12345." To increase complexity, we have inserted special characters "@" and "#."

  const userSchema = Yup.object().shape({
    voterID: Yup.string().required("Voter's id is required"),
    name: Yup.string().required("Voter's name is required"),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const onFormSubmitHandler = async (values: any, actions: any) => {
    setShowSpinner(true);
    setFormMessage({
      message: '',
      ok: false,
    });

    const { message, ok } = await onCreateNewUser(values);

    setShowSpinner(false);
    setShowMessage(true);

    setFormMessage({
      message: message,
      ok: ok,
    });
  };

  return (
    <section className={styles.form}>
      {showMessage && (
        <h2
          className={
            formMessage.ok ? styles['no--form__error'] : styles['form--error']
          }
        >
          {formMessage.message}
        </h2>
      )}
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
          voterID: '',
          password: '',
          name: '',
        }}
        onSubmit={(values, actions) => onFormSubmitHandler(values, actions)}
        validationSchema={userSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div
              className={`${styles['title--container']} ${styles['form--field__container']}`}
            >
              <h3>Voter's ID</h3>

              <input
                type='text'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder='Enter an ID'
                name='voterID'
                value={props.values.voterID}
                title='voterID'
              />

              <p className={styles.error}>
                <ErrorMessage name='voterID' />
              </p>
            </div>

            <div
              className={`${styles['title--container']} ${styles['form--field__container']}`}
            >
              <h3>Voter's Name</h3>

              <input
                type='text'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder='Enter a name'
                name='name'
                value={props.values.name}
                title='name'
              />

              <p className={styles.error}>
                <ErrorMessage name='name' />
              </p>
            </div>

            <div
              className={`${styles['title--container']} ${styles['form--field__container']}`}
            >
              <h3>Voter's Password</h3>
              <input
                type='text'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder='Enter a password'
                name='password'
                value={props.values.password}
                title='name'
              />
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

export default CreateUser;
