import React from "react";
import styles from "@/components/Header/header.module.css"
import { Row, Col, Menu } from "antd"
import { useState } from "react";
import Router from "next/router"
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined

} from '@ant-design/icons';
const Header = () => {
    const [menuList, setMenu] = useState(
        [
            {
                label:"首页",
                key:0,
                icon:<HomeOutlined style={{marginRight:'5px'}}/>
            }, 
            {
                label:"视频",
                key:1,
                icon:<YoutubeOutlined style={{ marginRight: '5px' }} />
            }, 
            {
                label:"生活",
                key:2,
                icon:<SmileOutlined style={{ marginRight: '5px' }} />
            }
        ]
    )
    const handleListChange=(e)=>{//根据不同的类别跳转到列表页（即列表中展示的文章是根据携带的typeid来决定的）
        console.log(e);
        if(Number(e.key)===0){
            Router.push('/');
        }else{
            Router.push('/list?id='+e.key);
        }
    }
    return (
        <div className={styles.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className={styles.headerLogo}>My-Blog</span>
                    <span className={styles.headerDesc}>我的博客，记录学习生活的点点滴滴</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" items={menuList} onClick={handleListChange}>
                        {/* <Menu.Item key="home">
                            <HomeOutlined style={{ marginRight: '5px' }} />
                            首页
                        </Menu.Item>
                        <Menu.Item key="video">
                            <YoutubeOutlined style={{ marginRight: '5px' }} />
                            视频
                        </Menu.Item>
                        <Menu.Item key="life">
                            <SmileOutlined style={{ marginRight: '5px' }} />
                            生活
                        </Menu.Item> */}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header
