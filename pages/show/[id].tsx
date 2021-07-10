import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { useRouter } from 'next/router';
import EpisodeList, {EpisodeListProps} from "../../components/episode/EpisodeList";
import prisma from '../../lib/prisma'
import { useSession } from "next-auth/client";
import CreateEpisode from "../../components/episode/CreateEpisode";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const episode = await prisma.show.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select:{
      id: true,
      name: true,
      description: true,
      episodes: {
        select: {
          id: true,
          description: true,
          dateAired: true,
          participants: {
            select: {
              image: true
            }
          }
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
};

const EpisodeListPage: React.FC<Props> = props => {
  const [session, loading] = useSession();
  const router = useRouter()
  
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

  return (
    <Layout>
      <div className="mt-8 sm:block">
        <div className="mt-5 flex justify-center sm:mt-0">
          <CreateEpisode props={props}/>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Episode Description</span>
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Aired
                </th>
                <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            {props.episodes.reverse().map((episode) => (
            <EpisodeList  key={episode.id} episode={episode} />
              ))}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EpisodeListPage;
