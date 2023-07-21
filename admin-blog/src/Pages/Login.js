import React, { useState, useEffect, createContext } from 'react'
import { Card, Input, Spin, Button, message } from "antd"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {
    UserAddOutlined,
    KeyOutlined
} from '@ant-design/icons';
import "../static/css/login.css"
export default function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)//isLoading主要用于控制Spin组件是否进入加载状态
    const navigate=useNavigate();
    useEffect(() => { }, [])
    const checkLogin = () => {
        if (!userName) {
            message.error("用户名不能为空！");
            return false;
        } else if (!password) {
            message.error("密码不能为空！");
            return false;
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        setIsLoading(true)
        axios({
            method: 'POST',
            url: "http://127.0.0.1:7001/admin/login",
            data: dataProps,
            withCredentials: true
        }).then(res => {
            setIsLoading(false);
            console.log(res.data);
            if (res.data.data === "登陆成功") {
                localStorage.setItem('openId', res.data.openId);
                navigate('/admin')
            } else {
                message.error("登陆失败");
            }
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博客后台管理系统" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserAddOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
