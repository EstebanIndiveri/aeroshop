import React,{useState,useEffect, Fragment} from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Button,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers,deleteUser } from '../actions/userActions';

const UserListScreen=({history})=>{

    const dispatch=useDispatch();

    const userList=useSelector(state=>state.userList);
    const {loading,error,users}=userList;

    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;

    const userDelete=useSelector(state=>state.userDelete);
    const {success:successDelete}=userDelete;

    useEffect(()=>{
        if(userInfo&&userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,history,successDelete])

    const deleteHandler=(id)=>{
        // console.log('delete',id)
        if(window.confirm('Are you sure')){
            dispatch(deleteUser(id))
        }
    }

    return (
        <Fragment>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>AMDIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin?<i className="fas fa-check" style={{color:'green'}}></i>:(
                                    <i className="fas fa-times" style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    
                                        <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Fragment>
    )
}

export default UserListScreen