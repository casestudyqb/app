import React, {useState} from "react";
import { useSession } from "next-auth/client";
import {
  ChatAltIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'

import {  useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchLikes } from '../../../hooks/useLikes'


export type ArticleSegmentProps = {
  id: number;
  title: string;
  description: string;
  episodeNum: number;
  dateAired: string;
  image: string;
  url: string;
  like: [{
    userId: number;
    length: number;
  }]
  segmentType: {
    name: string
  };
  segmentNote: [{
    id: number;
    noteText: string;
    authorId: number;
  }];
  participants: [{
    image: string
  }];
  createdBy: [
    {
      name: string;
      image: string;
    }
  ];
  assignedTo: 
    {
      name: string;
      image: string;
    };
};

const questions = [
  {
    id: '81614',
    likes: '',
    replies: '',
    views: '2.7k',
    author: {
      name: 'Dries Vincent',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    date: 'December 9 at 11:43 AM',
    datetime: '2020-12-09T11:43:00',
    href: '#',
    title: 'What would you have done differently if you ran Jurassic Park?',
    body:
      '\n          <p>\n            Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.\n          </p>\n          <p>\n            Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;\n          </p>\n        ',
  },
  // More questions...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ArticleSegment: React.FC<{ segment: ArticleSegmentProps, status: string }> = 
  ({ segment, status }) => {
  const [session,loading]= useSession();
  const note =  segment.segmentNote.find(e => e.authorId === session.userId )
  const [open, setOpen] = useState(false)
  const [loadingAssignment, setLoadingAssignment] = useState(false)
  //const [like, setLike] = useState(segment.like.filter(e => e.userId === session.userId ))
  //const [totalLikes, setTotalLikes] = useState(segment.like)
  const [content, setContent] = !note ? useState(""): useState(note.noteText);
  const [assigned, setAssigned] = useState(segment.assignedTo)

  const { data } = useQuery(['likes', segment.id], ()=>fetchLikes(segment.id))

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { segmentId: segment.id, content, segmentNoteId: typeof note !== "undefined" ? note.id : -1 };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(()=> setOpen(false));
    } catch (error) {
      console.error(error);
    }
  };

  const submitLike = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { segmentId: segment.id, likes: segment.like };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => {
        return response.json();
      })
      // .then((json) => {
      //   setTotalLikes(json)
      //   setLike(json.filter(e => e.userId === session.userId ))
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(submitLike, {
    onMutate: async () => {
      await queryClient.cancelQueries('likes')

      queryClient.setQueryData(["likes", segment.id], (prev: any) => {
        const isLiked = prev.like.filter((num: any) => num.userId === session.userId).length > 0 
                            ? true : false

        isLiked ? prev.like.pop(({ userId: session.userId})) :
                            prev.like.push({ userId: session.userId})

        return prev
      });
    }
  })

  
  const submitAssignment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoadingAssignment(true)

    try {
      const body = { segmentId: segment.id};
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => {
        return response.json();
      }).then((json) => {
        setAssigned(json.assignedTo)
        setLoadingAssignment(false)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const AssignButton = () => {
    if (!loadingAssignment) {
      if (!assigned) {
        return <button
          onClick={submitAssignment}
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          Not Assigned
        </button>
      } else {
      return <div className="flex text-sm space-x-2 cursor-pointer" onClick={submitAssignment}>
        <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full " src={assigned.image} alt="" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 mt-2" >
              <span>
                Assigned to: {assigned.name}
              </span>
          </p>
        </div>
      </div>
      }
    } else {
      return <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> 
    }
    
  }

  if (!data) return <div>loading</div>


  return (
    !open ? 
      <div className="mt-4">
        <h1 className="sr-only">{segment.segmentType.name}</h1>
          <ul className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl">
              <div className="md:flex">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{segment.segmentType.name}</div>
                  <a href={segment.url} className="block mt-1 text-md leading-tight font-medium text-black hover:underline">{segment.title}</a>
                  <p className="mt-2 text-gray-500">{segment.description}</p>
                  <div className="mt-4 flex justify-between space-x-8">
                    <div className="flex space-x-6">
                        <span className="inline-flex items-center text-sm">
                        <button 
                            className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            onClick={mutate}
                        >
                            { data.like.length > 0 ? <ThumbUpIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> : <ThumbUpIcon className="h-5 w-5" aria-hidden="true" /> }
                            <span className="font-medium text-gray-900">{data.like.length}</span>
                            <span className="sr-only">likes</span>
                        </button>
                        </span>
                        <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            onClick={()=> setOpen(true)}
                            >
                            <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{question.replies}</span>
                            <span className="sr-only">replies</span>
                        </button>
                        </span>
                        {/* <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                            <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{question.views}</span>
                            <span className="sr-only">views</span>
                        </button>
                        </span> */}
                    </div>
                    <div className="flex text-sm space-x-2">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={segment.createdBy[0].image} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 mt-2" >
                              <span>
                                Added by: {segment.createdBy[0].name}
                              </span>
                          </p>
                          {/* <p className="text-sm text-gray-500">
                              <a href={question.href} className="hover:underline">
                              <time dateTime={question.datetime}></time>
                              </a>
                          </p> */}
                        </div>
                    </div>
                    {status === "final" ? <AssignButton /> : null}
                  </div>
                  </div>
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={segment.image}  alt="" />
                  </div>
              </div>
            </div>
            ))}
          </ul>
      </div> 
    : 
  <div className="mt-4">
    <h1 className="sr-only">{segment.segmentType.name}</h1>
    <ul className="space-y-4">
      {questions.map((question) => (
        <li key={question.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby={'question-title-' + question.id}>
            <div>
              <h2  className="mt-4 text-base font-small text-red-900">
                  My Notes ({content.length}/2000)
              </h2>
            </div>
            <form onSubmit={submitData}>
              <div>
                <textarea
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  rows={8}
                  value={content}
                />
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                {/* <input disabled={!content} type="submit" value="Create" /> */}
                <button
                    // onClick={()=> getData({title, description, url, image, episodeId, segmentId})}
                    disabled={!content || content.length > 2000}
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-default"
                    >
                  {/* { loading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> : null } */}
                      Save 
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                    >
                    Cancel
                </button>
                {/* <a className="back" href="#" onClick={() => setOpen(false)}>
                  or Cancel
                </a> */}
              </div>
            </form>
            <div className="mt-6 flex justify-between space-x-8">
              <div className="flex space-x-6">
                <span className="inline-flex items-center text-sm">
                  <button 
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    onClick={submitLike}
                  >
                    { segment.like.length > 0 ? <ThumbUpIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> : <ThumbUpIcon className="h-5 w-5" aria-hidden="true" /> }
                    <span className="font-medium text-gray-900">{segment.like.length}</span>
                    <span className="sr-only">likes</span>
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    onClick={()=> setOpen(false)}
                    >
                    <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium text-gray-900">{question.replies}</span>
                    <span className="sr-only">replies</span>
                  </button>
                </span>
                {/* <span className="inline-flex items-center text-sm">
                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium text-gray-900">{question.views}</span>
                    <span className="sr-only">views</span>
                  </button>
                </span> */}
              </div>
              <div className="flex text-sm space-x-2">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={segment.createdBy[0].image} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <a href={question.author.href} className="hover:underline">
                      Added by: {segment.createdBy[0].name}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">
                    <a href={question.href} className="hover:underline">
                      <time dateTime={question.datetime}></time>
                    </a>
                  </p>
                </div>
              </div>
              {/* <div className="flex text-sm space-x-2">
                <div className="flex-wrap">
                    <img className="h-11 w-11" src={segment.image} alt="" />
                </div>
              </div> */}
            </div>
          </article>
        </li>
      ))}
    </ul>
    <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
  </div> 
  );
};

export default ArticleSegment;
