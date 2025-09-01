"use client"
import React, { useEffect } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { getByIdUser, updateUser } from '../../redux/actions/userActions';
import { CreateAccountApi } from '../../redux/actions/authAction';
import { useParams, useRouter } from 'next/navigation';

const getValidationSchema = (isEdit) => Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: isEdit
        ? Yup.string().notRequired()
        : Yup.string()
            .min(3, 'Password should be at least 3 characters')
            .required('Password is required'),
    confirm_password: isEdit
        ? Yup.string().notRequired()
        : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
    role: Yup.string().oneOf(['user', 'admin'], 'Role is required').required('Role is required'),
});


const UserForm = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useRouter()
    // pass `!!id` (true if id exists) to schema generator
    const validationSchema = getValidationSchema(!!id);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "user"
        },
        validationSchema,
        onSubmit: async (values) => {
            debugger
            if (id) {
                const apidata = await dispatch(updateUser({ id, data: values }))
                if (apidata?.payload?._id) {
                    navigate.push('/users')
                }
            } else {
                const apidata = await dispatch(CreateAccountApi(values))
                if (apidata?.payload?.message) {
                    navigate.push('/users')
                }
            }

            console.log('Form data:', values);
            // Call your API here
        }
    });

    useEffect(() => {
        if (id) {
            // Call API to get user data
            const getUser = async () => {
                const user = await dispatch(getByIdUser(id))
                formik.setValues(user?.payload)
            }
            getUser()
        }
    }, [])

    return (
        <div className='h-screen flex flex-col align-middle items-center justify-center'>
            <Card title={id ? "Edit User" : 'Add User'} className='shadow-md text-center w-[80%]'>
                <Form
                    style={{ Width: "100%" }}
                    onFinish={formik.handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
                        help={formik.touched.name && formik.errors.name}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>
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
                    {id ? <></> : <>
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
                        <Form.Item
                            label="Confirm Password"
                            validateStatus={formik.touched.confirm_password && formik.errors.confirm_password ? 'error' : ''}
                            help={formik.touched.confirm_password && formik.errors.confirm_password}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirm Password"
                                name="confirm_password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>
                    </>}
                    <Form.Item
                        label="Role"
                        validateStatus={formik.touched.role && formik.errors.role ? 'error' : ''}
                        help={formik.touched.role && formik.errors.role}
                    >
                        <Select
                            name="role"
                            value={formik.values.role}
                            disabled
                            onChange={value => formik.setFieldValue('role', value)}
                            onBlur={() => formik.setFieldTouched('role', true)}
                            style={{ width: '100%', textAlign: 'left' }}
                        >
                            <Select.Option value="user">User</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            {id ? "Update" : "Add"}
                        </Button>
                        or <a href="/users" className='text-blue-500'>Back now!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UserForm;
