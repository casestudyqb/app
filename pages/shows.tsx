import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
// import Post, { PostProps } from "../components/Post";
import Show, { ShowProps } from "../components/Show";
import prisma from '../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  //const feed = await prisma.show.findMany()
  const feed = await prisma.show.findMany();
  return {
    props: { feed },
  };
};

type Props = {
  feed: ShowProps[];
};

// const Shows: React.FC<Props> = (props) => {
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {props.feed.map((post) => (
//             <div key={post.id} className="post">
//               <Show />
//               {/* <Post post={post} /> */}
//             </div>
//           ))}
//         </main>
//       </div>
//     </Layout>
//   );
// };

const Shows: React.FC<Props> = (props) => {
  return (
    <Layout>
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              CaseStudyQB Shows
            </h2>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {props.feed.map((post) => (
              <div key={post.id}>
                <Show post={post} /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shows;