import Link from 'next/link';

export default function StudyList({ posts, admin }) {
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
    <div className="card">
      <Link href={`${post.studyNumber.value}`} passHref>
        <h2>
          <a>{post.titleOfStudy.value}</a>
        </h2>
      </Link>
    </div>
  );
}
