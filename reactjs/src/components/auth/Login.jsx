import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(3, 'Password should be at least 3 characters').required('Password is required'),
});

const CreateAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "john@example.com",
            password: "1234",
        },
        validationSchema,
        onSubmit: async (values) => {
            const apidata = await dispatch(loginApi(values))
            if (apidata?.token) {
                navigate('/users')
            }
            console.log('Form data:', values);
            // Call your API here
        }
    });

    return (
        <div className='h-screen flex flex-col align-middle items-center justify-center'>
            <Card title='Create Account' className='shadow-md text-center w-fit'>
                <Form
                    style={{ maxWidth: 400, minWidth: 300 }}
                    onFinish={formik.handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
                        help={formik.touched.email && formik.errors.email}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
                        help={formik.touched.password && formik.errors.password}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Login
                        </Button>
                        or <a href="/create" className='text-blue-500'>Create now!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateAccount;
