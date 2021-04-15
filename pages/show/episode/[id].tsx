import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../../components/Post";
import EpisodeList, {EpisodeListProps} from "../../../components/episode/EpisodeList";
import prisma from '../../../lib/prisma'
import { useSession } from "next-auth/client";
import ArticleSegment from "../../../components/episode/segment/ArticleSegment"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const episode = await prisma.episode.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select:{
      id: true,
      episodeNum: true,
      description: true,
      showId: true,
      segments: {
        select: {
          id: true,
          title: true,
          description: true,
          image: true
        }
      },
      show: {
        select: {
          name: true
        }
      }
    }
  });
  return {
    props: episode,
  };
};

// async function publishPost(id: number): Promise<void> {
//   await fetch(`http://localhost:3000/api/publish/${id}`, {
//     method: "PUT",
//   });
//   await Router.push("/");
// }

// async function deletePost(id: number): Promise<void> {
//   await fetch(`http://localhost:3000/api/post/${id}`, {
//     method: "DELETE",
//   });
//   Router.push("/");
// }

type Props = {
  episodes: EpisodeListProps[];
  description: string;
  show: {
    name: string
  }
};

const tabs = [
  { name: 'Final', href: '#', current: true },
  { name: 'Draft', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const EpisodePage: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  // const postBelongsToUser = session?.user?.email === props.author?.email;
  // let title = props.title;
  // if (!props.published) {
  //   title = `${title} (Draft)`;
  // }

  return (
    <Layout>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <h2 className="sr-only" id="profile-overview-title">Profile Overview</h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=4bjJsNgMdl&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                {/* <p className="text-sm font-medium text-gray-600">Welcome back,</p> */}
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{props.description}</p>
                <p className="text-sm font-medium text-gray-600">{props.show.name}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <a href="#" className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <main className="lg:col-span-9 xl:col-span-6">
            <div className="px-4 sm:px-0">
              <div className="sm:hidden">
                <label htmlFor="question-tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="question-tabs"
                  className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                  {tabs.map((tab, tabIdx) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? 'page' : undefined}
                      className={classNames(
                        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                      )}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? 'bg-rose-500' : 'bg-transparent',
                          'absolute inset-x-0 bottom-0 h-0.5'
                        )}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <ArticleSegment />
          </main>
    </Layout>
  );
};

export default EpisodePage;
