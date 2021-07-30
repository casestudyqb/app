import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../../components/Layout";
import {EpisodeListProps} from "../../../components/episode/EpisodeList";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/client";
import ArticleSegment from "../../../components/episode/segment/ArticleSegment"
import PictureSegment from "../../../components/episode/segment/PictureSegment"
import TextSegment from "../../../components/episode/segment/TextSegment"
import CreateSegment from "../../../components/episode/segment/CreateSegment"

import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchEpisodes } from '../../hooks/useEpisodes'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('episodes', () => fetchEpisodes(params?.id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }, 
  }
}

type Props = {
  id: number
  episodes: EpisodeListProps[];
  description: string;
  show: {
    name: string;
    picUrl: string;
  };
};

const Tabs = ({ color, props }) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? `text-white bg-${color}-600`
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Final
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Draft
                {props.segments.length > 0 ? <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{props.segments.filter(draft=> draft.draft === true).length}</span> : null }
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {props.segments.map(data => {
                  if (data.segmentId === 1 && data.draft === false) {
                    return <ArticleSegment key={data.id} segment={data} status={"final"} />
                  } else if (data.segmentId === 2 && data.draft === false) {
                    return <TextSegment key={data.id} segment={data} />
                  } else if (data.segmentId === 3 && data.draft === false) {
                    return <PictureSegment key={data.id} segment={data} />
                  }
                })}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {props.segments.map(data => {
                    if (data.segmentId === 1 && data.draft === true) {
                      return <ArticleSegment key={data.id} segment={data} status={"draft"}/>
                    } else if (data.segmentId === 2 && data.draft === true) {
                      return <TextSegment key={data.id} segment={data} />
                    } else if (data.segmentId === 3 && data.draft === true) {
                      return <PictureSegment key={data.id} segment={data} />
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EpisodePage: React.FC<Props> = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query

  const { data } = useQuery('episodes', ()=>fetchEpisodes(id))


  if (loading) {
    return <div>Authenticating ...</div>;
  }

  if (!session) {
    router.push('/api/auth/signin')
  }

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  //const userHasValidSession = Boolean(session);
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
                <img className="mx-auto h-20 w-20 rounded-full" src={data.show.picUrl} alt="" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                {/* <p className="text-sm font-medium text-gray-600">Welcome back,</p> */}
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{data.description}</p>
                <p className="text-sm font-medium text-gray-600">{data.show.name}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <CreateSegment props={data}/>
            </div>
          </div>
        </div>
      </div>
      <main className="lg:col-span-9 xl:col-span-6">
        <Tabs color="indigo" props={data} />
      </main>
    </Layout>
  );
};

export default EpisodePage;