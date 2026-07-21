// import ErrorMessage allows users to show error message easily.
import { Formik, Field, Form, ErrorMessage } from 'formik';
// * means Everything. as Yup, means to import everything to Yup
import * as Yup from 'yup';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore'

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "The name must be at least 2 characters."),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Must be at least 6 characters long"),
    confirmPassword: Yup.string().oneOf([
        Yup.ref("password"),
        null
    ], "The passwod must match").required("Please confirm your password")
});

export default function RegisterPage() {

    // if don't need location, can leave it empty, and just write [, setLocation]
    const [, setLocation] = useLocation();
    const { showMessage } = useFlashMessage();

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

    // initialvalues is an object that contains the initial values for the form fields
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        salutation: "Mr",
        marketingPreferences: []
    };

    // handle submit is called when the user submits the form
    // it takes two arguments
    // argument 1: the values of the form fields
    // argument 2: helper object that let us manipulate the form state 
    const handleSubmit = (values, formikHelpers) => {
        // indicate that the form is in process of being submitted
        // false means to disable submittion
        formikHelpers.setSubmitting(true);
        // alert("Form submitted");
        setTimeout(function () {
            console.log("The form has finished processing");
            // enable button submission
            formikHelpers.setSubmitting(false);
            // TODO: have an if statement ot see if the form has been submitted properly.

            // show the flash message
            showMessage("You have signed up successfully.", "success");
            setLocation("/");
        }, 3000)
    }

    return (<>
        <div className="container">
            <h1>Register Page</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
                            {/* Password Field */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field type="password"
                                    id="password"
                                    className="form-control"
                                    name="password"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger" />

                            </div>
                            {/* Confirm Password Field */}
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <Field type="password"
                                    id="confirmPassword"
                                    className="form-control"
                                    name="confirmPassword"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />

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