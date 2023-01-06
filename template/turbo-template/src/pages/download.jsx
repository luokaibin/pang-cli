import I18n from '@utils/i18n';
import Navbar from '@components/Navbar'
import styles from '@styleModules/downLoad.module.css';
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames';

import { Layout } from 'antd';
const { Header } = Layout

export default function NormalUser (props) {
  return (

    <Layout className={styles.container}>
      <Header>
         <Navbar></Navbar>
      </Header>

      <div className={styles.content}>
        <h1 className={cn(styles.title, 'Medium')}>{I18n.t('start_crypto_trading')}</h1>
        <div className={styles.banner}>
          <Image
            src={require('@images/downloadPage.webp')}
            width={345}
            height={309}
            layout='fixed'
            alt={'kikitrade'}
          />
        </div>
        <div className={styles.scanImg}>
          <Image
            src={require('@images/login/qrcode.webp')}
            layout="fixed"
            width={100}
            height={100}
            alt=''
          />
        </div>
        <div className={styles.scanText}>{I18n.t('common_scan_download')}</div>
        <div className={styles.btnWrapper}>
          <Link href="https://app.adjust.com/h7et2hs"><a target="_blank"><div className={cn(styles.btn, styles.btn1)}>App Store</div></a></Link>
          <Link href="https://app.adjust.com/n2d212k"><a target="_blank"><div className={cn(styles.btn, styles.btn2)}>Google Play</div></a></Link>
        </div>
      </div>
    </Layout>

  )
}
