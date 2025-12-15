import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    updated: {
      type: 'date',
      required: false,
    },
    category: {
      type: 'enum',
      options: ['tech', 'life', 'work'],
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    cover: {
      type: 'string',
      required: false,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    draft: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        // Get just the filename without extension for cleaner URLs
        const path = doc._raw.flattenedPath.replace('posts/', '')
        const segments = path.split('/')
        return segments[segments.length - 1]
      },
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const path = doc._raw.flattenedPath.replace('posts/', '')
        const segments = path.split('/')
        return `/blog/${segments[segments.length - 1]}`
      },
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    cover: {
      type: 'string',
      required: false,
    },
    techStack: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    demoUrl: {
      type: 'string',
      required: false,
    },
    githubUrl: {
      type: 'string',
      required: false,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const path = doc._raw.flattenedPath.replace('projects/', '')
        const segments = path.split('/')
        return segments[segments.length - 1]
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const path = doc._raw.flattenedPath.replace('projects/', '')
        const segments = path.split('/')
        return `/projects/${segments[segments.length - 1]}`
      },
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
