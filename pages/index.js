import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import HomeStyles from "../styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";
import Date from "@/components/Date";
import { getAllPostsData } from '../lib/posts';

//SSGの場合
export async function getStaticProps() {
  const allPostsData = await getAllPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私は機械学習エンジニアです
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={HomeStyles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`} className={HomeStyles.boldText}>
                <img src={`${thumbnail}`} className={HomeStyles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={HomeStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
