import React, { useState, useEffect } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import '../static/css/addArticle.css'
import 'highlight.js/styles/monokai-sublime.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"

const { Option } = Select;
const { TextArea } = Input
function AddArticle() {
    const navigate = useNavigate()
    const params=useParams()//获取路由跳转携带的参数
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别信息

    marked.setOptions({
        renderer: marked.Renderer(),
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
    const initArticleType = () => {
        axios({
            url: "http://127.0.0.1:7001/admin/getType",
            method: 'GET',
            withCredentials: true,
        }).then(res => {
            if (res.data.data === "没有登陆") {
                //console.log("res", res.data);
                localStorage.removeItem('openId')
                navigate('/')
            } else {
                //console.log(res.data);
                setTypeInfo(res.data.data)
            }
        })
    }
    const getArticleById = (id) => {
        axios("http://127.0.0.1:7001/admin/getArticleById/" + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
            }
        )
    }
    useEffect(() => {
        initArticleType();
        //获得文章ID
        const tmpId=params.id;
        console.log(tmpId);
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [])
    const changeTitle = (e) => {
        setArticleTitle(e.target.value);
    }
    const changeSelectedType = (value) => {
        setTypeInfo(value);
    }
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const changeDate = (data, dataString) => {
        setUpdateDate(dataString)
    }
    const saveArticle = () => {//保存文章
        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!updateDate) {
            message.error('发布日期不能为空')
            return false
        }
        message.success('检验通过')
        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = updateDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000
        if (articleId == 0) {
            //console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: "http://127.0.0.1:7001/admin/addArticle",
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)//修改保存的articleId，这样再次修改提交就是修改文章
                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        } else {
            //console.log('articleId:' + articleId)
            dataProps.id = articleId
            axios({
                method: 'post',
                url: "http://127.0.0.1:7001/admin/updateArticle",
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.updateSuccess) {
                        message.success('文章更新成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }

    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                value={articleTitle}
                                onChange={changeTitle}
                                onPressEnter={changeTitle}
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={changeSelectedType}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                                value={markdownContent}
                            >

                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={changeDate}
                                    

                                />
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
export default AddArticle