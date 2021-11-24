import Layout from '../components/Layout'
import useSWR from 'swr'
import axios from 'axios'
import { COMMENT } from '../types/Types'
import Comment from '../components/Comment'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

const CommentPage: React.FC = () => {
  const { data: comments, error } = useSWR('commentFetch', axiosFetcher)

  if (error)
    return (
      <Layout title="Comment">
        <span>Error</span>
      </Layout>
    )
  if (!comments)
    return (
      <Layout title="Comment">
        <div>loading...</div>
      </Layout>
    )

  return (
    <Layout title="Comment">
      <p className="text-4xl m-10">comment page</p>
      <ul>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </ul>
    </Layout>
  )
}
export default CommentPage
