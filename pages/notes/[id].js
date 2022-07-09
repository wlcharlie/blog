import { getAllNoteIds, getNoteData } from "lib/notes"

export async function getStaticPaths() {
  const paths = getAllNoteIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const noteData = await getNoteData(params.id)
  return {
    props: {
      noteData,
    },
  }
}

export default function Note({ noteData }) {
  return (
    <div>
      {noteData.title}
      <br />
      {noteData.id}
      <br />
      <div dangerouslySetInnerHTML={{ __html: noteData.contentHtml }} />
    </div>
  )
}
