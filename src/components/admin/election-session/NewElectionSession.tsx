'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import cookie from 'js-cookie';
import { getUserData } from '@/components/utils';

import Image from 'next/image';
import Link from 'next/link';

import { Formik } from 'formik';
import * as Yup from 'yup';

import moment from 'moment-timezone';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from '@/styles/admin/election-management.module.scss';

import { createNewElectionSession } from '@/actions/ServerActions';

import Spinner from '@/../public/icons/loading.png';
import {} from '@/components/SecuredAdminRoute';

type FormMessage = {
  message: string;
  ok: boolean;
};

/**
 * @memberof election-management page
 * @returns JSX for form container
 */

function NewElectionSession() {
  const router = useRouter();

  // ();

  const timeZone = 'Africa/Lagos';
  const localTimeInLagos = moment().tz(timeZone);

  const tomorrow = localTimeInLagos.clone().add(1, 'day').toDate();

  const [endDate, setEndDate] = useState<Date>(tomorrow);

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<FormMessage>({
    message: '',
    ok: false,
  });

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    router.refresh();
  }, [router]);

  // const onReloadHandler = async () => {
  //   const userID = cookie.get('userID');

  //   if (userID) {
  //     const { role } = await getUserData(userID);

  //     if (role !== 'admin') {
  //       router.refresh();
  //       return;
  //     }
  //   }
  // };

  const schema = Yup.object().shape({
    sessionTitle: Yup.string().required(),
    endDate: Yup.date(),
  });

  const onSubmitFormHandler = (values: any, actions: any) => {
    setShowMessage(false);

    const formattedEndDate = endDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });

    const formValues = {
      ...values,
      endDate: formattedEndDate,
    };

    formMessageHandler(formValues);
  };

  const formMessageHandler = async (form: any) => {
    setShowSpinner(true);

    const { ok, message } = await createNewElectionSession(form);

    setShowSpinner(false);
    setShowMessage(true);

    setFormMessage({
      message,
      ok,
    });
  };

  return (
    <>
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
            sessionTitle: '',
            endDate: endDate,
          }}
          onSubmit={(values, actions) => {
            onSubmitFormHandler(values, actions);
          }}
          validationSchema={schema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div
                className={`${styles['title--container']} ${styles['form--field__container']}`}
              >
                <h3>Session Title</h3>
                <input
                  type='text'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.sessionTitle}
                  title='title'
                  placeholder='Enter a position title'
                  name='sessionTitle'
                />
                {props.errors.sessionTitle && (
                  <div id='feedback'>
                    <p className={styles.error}>{props.errors.sessionTitle}</p>
                  </div>
                )}
              </div>

              <div
                className={`${styles['date--containers']} ${styles['form--field__container']}`}
              >
                <div className={styles['date--container']}>
                  <h3>End Date</h3>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date || new Date())}
                    minDate={tomorrow}
                  />
                </div>
              </div>

              <div className={styles['btns--container']}>
                <button
                  type='submit'
                  className={`${
                    showSpinner
                      ? styles['spinner--submit__btn']
                      : styles['submit--btn']
                  } ${formMessage.ok ? styles['disabled'] : ''} `}
                  disabled={formMessage.ok}
                >
                  {showSpinner ? (
                    <span className={styles['spinner']}>
                      <Image
                        src={Spinner}
                        alt='icon'
                        className={`${styles['spinner-icon']} ${styles['btn--spinner']}`}
                      />
                    </span>
                  ) : (
                    <p>{formMessage.ok ? 'Submitted' : 'Submit Form'}</p>
                  )}
                </button>

                <Link href={'/admin/sessions'}>
                  <button className={styles['btn']}>
                    <p>Next</p>
                  </button>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default NewElectionSession;
