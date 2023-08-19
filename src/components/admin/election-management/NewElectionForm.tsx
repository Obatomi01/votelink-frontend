'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ElectionCandidates from './ElectionCandidates';

import styles from '@/styles/admin/election-management.module.scss';

import { onGetDataFromForm } from '@/components/utils';

import Spinner from '@/../public/icons/loading.png';
import {} from '@/components/SecuredAdminRoute';

import cookie from 'js-cookie';
import { getUserData } from '@/components/utils';

type FormMessage = {
  message: string;
  ok: boolean;
};

type NewElectionFormProp = {
  id: string;
};

/**
 * @memberof election-management page
 * @returns JSX for form container
 */

function NewElectionForm(props: NewElectionFormProp) {
  const router = useRouter();

  const { id } = props;
  const [candidates, setCandidates] = useState<any>(['']);

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<FormMessage>({
    message: '',
    ok: false,
  });

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

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

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    candidates: Yup.array().of(Yup.string()).required(),

    endDate: Yup.date(),
  });

  const onCandidateChangeHandler = (newCandidateArr: string[]) => {
    const formattedCandidates = Array.from(new Set(newCandidateArr));
    setCandidates(formattedCandidates);
  };

  const onSubmitFormHandler = (values: any, actions: any) => {
    setShowMessage(false);

    if (
      (candidates[0] === '' && candidates.length === 1) ||
      candidates.length === 0
    ) {
      return actions.setErrors({ candidates: 'Enter a name' });
    }

    const formValues = {
      ...values,
      candidates: candidates,
    };

    formMessageHandler(formValues);
  };

  const formMessageHandler = async (form: any) => {
    setShowSpinner(true);

    const { ok, message } = await onGetDataFromForm(form, props.id);

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
            title: '',
            candidates: [''],
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
                <h3>Title</h3>
                <input
                  type='text'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                  title='title'
                  placeholder='Enter a position title'
                  name='title'
                />
                {props.errors.title && (
                  <div id='feedback'>
                    <p className={styles.error}>{props.errors.title}</p>
                  </div>
                )}
              </div>

              <div>
                <ElectionCandidates
                  onCandidateChange={onCandidateChangeHandler}
                  candidatesArr={props.values.candidates}
                  showError={props.errors.candidates}
                  showHeading={true}
                  formSubmitted={formMessage.ok}
                />
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

                <Link href={`/admin/sessions/${id}`}>
                  <button type='button' className={styles['btn']}>
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

export default NewElectionForm;
