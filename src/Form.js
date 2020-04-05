import { withFormik, Form, Field } from "formik";
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {Row, Col} from 'reactstrap';
import {FlexForm, Header, Competitors} from './components';
import './form.css';

const OnboardForm = ({ values, errors, touched, status }) => {
    const [ person, setPerson ] = useState([]);
    useEffect(() => {
        status && setPerson(person => [...person, status]);
    }, [status]);
    return (
        <div>
            {/* <img src="dc-logo.png"/> */}
            <Header>Capture да Flag!</Header>
            <FlexForm>
                <Col>
                    <Form className="flexContainer">
                        <h2>Sign Up: </h2>
                        <Row>
                            <label htmlFor="people">
                                Name:
                                <Field 
                                id="people" 
                                type="text" 
                                name="people" 
                                placeHolder="Enter Name"
                                />
                                {touched.people && errors.people && (
                                    <p className="errors">{errors.people}</p>
                                )}
                            </label>
                        </Row>

                        <Row>
                        <label>
                            Email:
                            <Field
                            
                            id="email"
                            type="text"
                            name="email"
                            placeHolder="Enter Email"
                            />
                            {touched.email && errors.email && (
                                <p className="errors">{errors.email}</p>
                            )}
                        </label>
                        </Row>

                        <Row>
                        <label htmlFor="password">
                            Password:
                            <Field
                            className="field"
                            id="password"
                            type="password"
                            name="password"
                            placeHolder="Enter Password"
                            />
                            {touched.password && errors.password && (
                                <p className="errors">{errors.password}</p>
                            )}
                        </label>
                        </Row>

                        <Row>
                        <label>
                            Terms of Service:
                            <Field
                            className="field"
                            type="checkbox"
                            name="tos"
                            checked={values.tos}
                            />
                        </label>
                        </Row>

                        <Row className="buttonDiv">
                        <button type="submit">Submit</button>
                        </Row>
                    </Form>
                </Col>                
            </FlexForm>
                <div className="cardContainer">
                    <Competitors>Current Competitors:</Competitors>
                    <div className="userCard">
                        {person.map(persons => {
                            return (
                            <div className="userFrame" key={persons.id}>
                                <p>Name: {persons.people}</p>
                                <p>Email: {persons.email}</p>
                            </div>     
                            )
                        })}
                    </div>
                </div>
            
        </div>
    );
};
const FormikOnboardForm = withFormik ({
    mapPropsToValues(props) {
        return {
            people: props.people || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        people: Yup.string().required("Name is required!"),
        email: Yup.string().required("Email is required!"),
        password: Yup.string().required("Password is required!")
    }),
    handleSubmit( values, { setStatus, resetForm }) {
        axios.post("https://reqres.in/api/users", values)
        .then ( response => {
            console.log('Success', response);
            setStatus(response.data);
            resetForm();
        })
        .catch ( err => console.log(err.response));
    }
})(OnboardForm);
export default FormikOnboardForm;