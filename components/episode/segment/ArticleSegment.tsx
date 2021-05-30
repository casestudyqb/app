import React, {useState} from "react";
import { useSession } from "next-auth/client";
import {
  ChatAltIcon,
  EyeIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'
import { notEqual } from "node:assert";


export type ArticleSegmentProps = {
  id: number;
  title: string;
  description: string;
  episodeNum: number;
  dateAired: string;
  image: string;
  url: string;
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
};

const questions = [
  {
    id: '81614',
    likes: '29',
    replies: '11',
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

const ArticleSegment: React.FC<{ segment: ArticleSegmentProps }> = ({ segment }) => {
  const [session,loading]= useSession();
  const note =  segment.segmentNote.find((e) => e.authorId === session.userId )
  const [open, setOpen] = useState(false)
  //const [content, setContent] = useState("");
  const [content, setContent] = !note ? useState(""): useState(note.noteText);



  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("test", content, segment.id, "note", note, segment.segmentNote)

    try {
      const body = { segmentId: segment.id, content, segmentNoteId: typeof note !== "undefined" ? note.id : -1 };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !open ? 
      <div className="mt-4">{console.log(!!segment.segmentNote, typeof note, segment.segmentNote)}
        <h1 className="sr-only">{segment.segmentType.name}</h1>
        <ul className="space-y-4">
          {questions.map((question) => (
            <li key={question.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
              <article aria-labelledby={'question-title-' + question.id}>
                <div>
                  <h2  className="mt-4 text-base font-small text-red-900">
                      {segment.segmentType.name}
                  </h2>
                  <h2 id={'question-title-' + question.id} className="mt-4 text-base font-medium text-gray-900">
                    {segment.title}
                  </h2>
                </div>
                <div
                  className="mt-2 text-sm text-gray-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: segment.description }}
                />  
                <div
                  className="mt-2 text-sm text-gray-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: segment.url }}
                />
                <div className="mt-6 flex justify-between space-x-8">
                  <div className="flex space-x-6">
                    <span className="inline-flex items-center text-sm">
                      <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium text-gray-900">{question.likes}</span>
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
                  <div className="flex text-sm space-x-2">
                    <div className="flex-wrap">
                        <img className="h-11 w-11" src={segment.image} alt="" />
                    </div>
                  </div>
                </div>
              </article>
            </li>
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
                  My Notes
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
              <div>
                <input disabled={!content} type="submit" value="Create" />
                <a className="back" href="#" onClick={() => setOpen(false)}>
                  or Cancel
                </a>
              </div>
            </form>
            <div className="mt-6 flex justify-between space-x-8">
              <div className="flex space-x-6">
                <span className="inline-flex items-center text-sm">
                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                    <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium text-gray-900">{question.likes}</span>
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
              <div className="flex text-sm space-x-2">
                <div className="flex-wrap">
                    <img className="h-11 w-11" src={segment.image} alt="" />
                </div>
              </div>
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
