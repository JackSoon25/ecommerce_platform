// import ErrorMessage allows users to show error message easily.
import { Formik, Field, Form, ErrorMessage } from 'formik';
// * means Everything. as Yup, means to import everything to Yup
import * as Yup from 'yup';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore'
import axios from 'axios';
import { useJWT } from './UserStore';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "The name must be at least 2 characters."),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function ProfilePage() {
    // if don't need location, can leave it empty, and just write [, setLocation]
    const [, setLocation] = useLocation();
    const { showMessage } = useFlashMessage();

    // get JWT for the current login user
    const { jwt } = useJWT();

    // API endpoint that returns all the possible marketing perferences
    const marketingPreferences = [
        {
            "id": 1,
            "name": "Email Updates"
        },
        {
            "id": 2,
            "name": "SMS Promotions"
        },
        {
            "id": 3,
            "name": "WhatsApp"
        }
    ]

    // store the initial values of the form
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        salutation: "Mr",
        marketingPreferences: [],
        country: ""
    });

    // create an effect to load the user's detials when the compoent render the first ime
    // put jwt as argument means whenever the jwt changes, use the Effect again
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(API_URL + "/users/me", {
                headers: {
                    authorization: 'Bearer ' + jwt
                }
            });
            setInitialValues(response.data);
        }
        fetchUser();
    }, [jwt]);

    const handleSubmit = async (values, formikHelpers) => {
        try {
            await axios.put(API_URL + "/users/me", values, {
                headers: {
                    Authorization: 'Bearer '+ jwt
                }
            })
            showMessage("User updated successfully")

        } catch (e) {
            console.error(e);
            showMessage("Unable to update user's details");

        }

    }

    return (<>
        <div className="container">
            <h1>Profile</h1>
            <Formik initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {
                    (formik) => (
                        <Form>
                            {/* Name Field */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field type="text"
                                    id="name"
                                    className="form-control"
                                    name="name"
                                />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email"
                                    id="email"
                                    className="form-control"
                                    name="email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />

                            </div>
                            {/* Salutation */}
                            <div className="mb-3">
                                <label className="form-label">Salutation</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            type="radio"
                                            id="mr"
                                            className="form-check-input"
                                            name="salutation"
                                            value="Mr"
                                        />
                                        <label className="form-label" htmlFor="mr">
                                            Mr.
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            type="radio"
                                            id="mrs"
                                            className="form-check-input"
                                            name="salutation"
                                            value="Mrs"
                                        />
                                        <label className="form-label" htmlFor="mrs">
                                            Mrs.
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            type="radio"
                                            id="ms"
                                            className="form-check-input"
                                            name="salutation"
                                            value="Ms"
                                        />
                                        <label className="form-label" htmlFor="ms">
                                            Ms.
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            type="radio"
                                            id="dr"
                                            className="form-check-input"
                                            name="salutation"
                                            value="Dr"
                                        />
                                        <label className="form-label" htmlFor="dr">
                                            Dr.
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Marketing Preferences */}
                            <div className="mb-3">
                                <label className="form-label">Marketing Preferences</label>
                                {
                                    marketingPreferences.map(function (p) {
                                        return (<div className="form-check" key={p.id}>
                                            <Field type="checkbox"
                                                id={`marketing-${p.id}`}
                                                className="form-check-input"
                                                value={String(p.id)}
                                                name="marketingPreferences"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`marketing-${p.id}`}
                                            >{p.name}</label>
                                        </div>)
                                    })
                                }

                            </div>
                            {/* Country */}
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <Field as="select"
                                    className="form-select"
                                    id="country"
                                    name="country">
                                    <option value="">Select Country</option>
                                    <option value="sg">Singapore</option>
                                    <option value="my">Malaysia</option>
                                    <option value="in">Indonesia</option>
                                    <option value="th">Thailand</option>
                                </Field>



                            </div>
                            <button type="submit"
                                className="btn btn-primary mb-3"
                                // is isSubmitting is true, disable the submit button
                                disabled={formik.isSubmitting}
                            >Submit</button>

                        </Form>
                    )
                }
            </Formik>
        </div>
    </>)
}
