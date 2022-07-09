import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const notesDirectory = path.join(process.cwd(), "notes")

function getFolderName(metaTagType) {
  switch (metaTagType) {
    case "typeScript":
      return "N_TypeScript"
    case "algo":
      return "N_Algo & Data Structures"
    default:
      return null
  }
}

function readNotesMetaData(fileNamesArr, directory) {
  return fileNamesArr.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the note metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
}

// TODO MISSING SORT
export function getSortedNotesData(metaTagType) {
  const folderName = getFolderName(metaTagType)
    ? getFolderName(metaTagType)
    : ""

  // Get file names under /notes
  const fileNames = fs.readdirSync(path.join(notesDirectory, folderName))

  if (!folderName) {
    const allNotesFolderNames = fileNames.filter((fileName) =>
      fileName.includes("N_")
    )

    const allNotesData = []

    allNotesFolderNames.forEach((folderName) => {
      const oneOfFolderNotesDirectory = path.join(notesDirectory, folderName)
      const notesName = fs.readdirSync(oneOfFolderNotesDirectory)

      const notesData = readNotesMetaData(
        notesName,
        oneOfFolderNotesDirectory
      ).map((data) => ({
        ...data,
        id: `${folderName}!${data.id}`,
        date: `${data.date}`,
      }))
      allNotesData.push(...notesData)
    })

    return allNotesData
  }

  const allNotesData = readNotesMetaData(fileNames, notesDirectory)
  return allNotesData
}

export function getAllNoteIds() {
  const fileNames = fs.readdirSync(notesDirectory)
  const allNotesFolderNames = fileNames.filter((fileName) =>
    fileName.includes("N_")
  )

  const allNotesData = []

  allNotesFolderNames.forEach((folderName) => {
    const oneOfFolderNotesDirectory = path.join(notesDirectory, folderName)
    const notesName = fs.readdirSync(oneOfFolderNotesDirectory)

    const notesData = readNotesMetaData(
      notesName,
      oneOfFolderNotesDirectory
    ).map((noteData) => ({
      ...noteData,
      id: `${folderName}!${noteData.id}`,
    }))
    allNotesData.push(...notesData)
  })

  return allNotesData.map((fileName) => {
    return {
      params: {
        id: fileName.id,
      },
    }
  })
}

export async function getNoteData(id) {
  const [folderName, fileName] = id.split("!")
  const fullPath = path.join(
    path.join(notesDirectory, folderName),
    `${fileName}.md`
  )

  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the note metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
    date: `${matterResult.data.date}`,
  }
}
