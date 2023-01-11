import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AiBrandWriter from "../components/aibrandwriter";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AiBrandWriter</title>
        <meta
          name="description"
          content="Generate branding snippets for your product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AiBrandWriter/>

      
    </div>
  );
};

export default Home;