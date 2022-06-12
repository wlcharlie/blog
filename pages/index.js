import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { getSortedPostsData } from "lib/posts"
import { getSortedNotesData } from "lib/notes"

export async function getStaticProps() {
  const allNotesData = getSortedNotesData()
  const allPostsData = getSortedPostsData()
  console.log(allNotesData)
  return {
    props: {
      allPostsData,
      allNotesData,
    },
  }
}

export default function Home({ allPostsData, allNotesData }) {
  return (
    <div>
      {/* Keep the existing code here */}
      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
          {allNotesData.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/notes/${id}`}>
                <a>{title || ""}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
