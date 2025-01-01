import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Tune Code";
export const siteTitle = "Next.js Blog";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Next.js Blog</title>
                <meta name="description" content="Next.jsで作成したブログ" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img
                            src="/images/profile.png"
                            className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img
                            src="/images/profile.png"
                            className={`${utilStyles.borderCircle}`}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}

            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}