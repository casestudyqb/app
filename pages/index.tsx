import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Show, { ShowProps } from "../components/show/Show";
import prisma from '../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.show.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      picUrl: true
    }
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: ShowProps[];
};

const Shows: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <div className=" bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
          <div className=" max-w-7xl mx-auto">
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
      </div>
    </Layout>
  );
};

export default Shows;