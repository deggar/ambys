import Link from 'next/link';

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.studyNumber.value} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  //   const wordCount = post?.content.trim().split(/\s+/g).length;
  //   const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="listStudy">
      <Link href={`/study/${post.studyNumber.value}`} passHref>
        <h2>
          <a>{post.studyNumber.value}</a>
        </h2>
      </Link>
      <p>{post.titleOfStudy.value}</p>
    </div>
  );
}
