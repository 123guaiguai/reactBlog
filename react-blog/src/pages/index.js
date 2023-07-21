import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from "../components/Advert"
import Footer from "../components/Footer"
import { Row, Col, List,Breadcrumb } from "antd"
import React, { useState } from "react"
import axios from "axios"
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
} from '@ant-design/icons';
const inter = Inter({ subsets: ['latin'] })

export default function Home(list) {
  const [mylist, setMylist] = useState(
    list.data
  );
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="commMain" type="flex" justify="center">
        <Col className="commLeft" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={
              item => (
                <List.Item>
                  <div className="listTitle">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    {item.title}
                    </Link>
                  </div>
                  <div className="listIcon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.view_count}人</span>
                  </div>
                  <div className="listContext">{item.introduce}</div>
                </List.Item>
              )
            }
          />
        </Col>

        <Col className="commRight" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </>
  )
}
Home.getInitialProps=async ()=>{
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleList').then((res)=>{
      //console.log(res.data.data)
      resolve(res.data);
    })
  })
  return await promise;
}
