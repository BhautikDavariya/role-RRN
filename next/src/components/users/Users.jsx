"use client"
import React, { useEffect } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteUser, fetchUsers } from '@/redux/actions/userActions';


const User = () => {
    const usersState = useSelector(state => state?.users);
    console.log('usersState', usersState)
    const users = usersState?.users || [];

    const navigate = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    console.log(users);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (a) => <div>
                <Button type="text" icon={<EditOutlined className='!text-blue-400 !w-[15px]' />} onClick={() => {
                    navigate.push(`/users/edit/${a._id}`)
                }} />
                <Button type="text" icon={<DeleteOutlined className='!text-red-500 !w-[15px]' onClick={() => {
                    dispatch(deleteUser(a._id))
                }} />} />
            </div>,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    return (
        <div className='h-screen flex flex-col items-center justify-center p-4'>
            <Card
                title='Users Account'
                className='shadow-lg w-[80%]'
                extra={
                    <>
                        <Button variant='solid' color='danger' className='me-3' onClick={() => {
                            localStorage.clear()
                            navigate.push('/login')
                        }}>Logout!</Button>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => navigate.push('/users/add')}
                            variant="solid"
                            color='cyan'
                            className='shadow-sm'
                        >
                            Add User
                        </Button>
                    </>
                }
            >
                <Table
                    columns={columns}
                    dataSource={users}
                    onChange={onChange}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default User;
