import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Diagram from '../components/Diagram'

export default function Home() {
  return (
    <div className={styles.container}>
      <Diagram />
    </div>
  )
}
