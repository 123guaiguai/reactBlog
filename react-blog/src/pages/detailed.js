import React, { useState ,useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import MarkNav from 'markdown-navbar';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import Tocify from '../components/tocify.tsx'
import {
    FireOutlined,
    CalendarOutlined,
    FolderOutlined,
} from '@ant-design/icons';




const Detailed = (props) => {

    let articleContent = props.article_content
    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({

        renderer: renderer,

        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,

        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });



    let html = marked(props.article_content)




    return (
        <>
            <Head>
                <title>detailed</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>

                        <div>
                            <div className="detailed-title">
                                {props.title}
                            </div>

                            <div className="listIcon center">
                                <span><CalendarOutlined /> {props.addTime}</span>
                                <span><FolderOutlined /> {props.typeName}</span>
                                <span><FireOutlined /> {props.view_count}人</span>
                            </div>

                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: html }}   >


                            </div>

                        </div>

                    </div>
                </Col>

                <Col className="commRight" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>

                        </div>
                    </Affix>

                </Col>
            </Row>
            <Footer />

        </>
    )

}

Detailed.getInitialProps = async (context) => {

    console.log(context.query.id)
    let id = context.query.id
    const promise = new Promise((resolve) => {

        axios('http://127.0.0.1:7001/default/getArticleListById/' + id).then(
            (res) => {
                // console.log(title)
                console.log(res.data.data[0]);
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}

export default Detailed