import { Avatar, Divider } from 'antd'
import styles from './author.module.css'
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined,
} from '@ant-design/icons';
const Author = () => {

    return (
        <div className={styles.authorDiv + ' comm-box'}>
            <div> <Avatar size={100} src="https://pic2.imgdb.cn/item/642c21b36ea21b9a9e9a1571.png" /></div>
            <div className={styles.authorIntroduction}>
                新手程序员，自学WEB前端开发。还在上大学的傻逼。希望祖国富强。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={
                    <GithubOutlined />
                } className={styles.account} />
                <Avatar size={28} icon={
                    <QqOutlined />
                } className={styles.account} />
                <Avatar size={28} icon={
                    <WechatOutlined />
                } className={styles.account} />

            </div>
        </div>
    )

}

export default Author