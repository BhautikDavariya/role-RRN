import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Spin, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


const User = () => {
    const usersState = useSelector(state => state);
    const users = usersState?.users || [];
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const datas = await dispatch(fetchUsers());
            if (datas) {
                setLoading(false);
            }
        }
        fetchUsers()
    }, []);



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
                <Button type="text" icon={<EditOutlined className='text-blue-400 w-[15px]' />} onClick={() => {
                    navigate(`/users/edit/${a._id}`)
                }} />
                <Button type="text" icon={<DeleteOutlined className='text-red-500 w-[15px]' onClick={() => {
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
                            navigate('/')
                        }}>Logout!</Button>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/users/add')}
                            variant="solid"
                            color='cyan'
                            className='shadow-sm'
                        >
                            Add User
                        </Button>
                    </>
                }
            >
                {loading ? <Flex align="center" gap="middle">
                    <Spin size="large" />
                </Flex> : <Table
                    columns={columns}
                    dataSource={users}
                    onChange={onChange}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />}
            </Card>
        </div>
    );
};

export default User;
