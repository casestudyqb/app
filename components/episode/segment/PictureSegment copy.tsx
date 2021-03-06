import React from "react";
import {
  ChatAltIcon,
  EyeIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'


export type PictureSegmentProps = {
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
      name: 'Dries Vincent fdfadfsdf',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    date: 'December 9 at 11:43 AM',
    datetime: '2020-12-09T11:43:00',
    href: '#',
    title: 'Meme of the Week',
    body:
      '\n          <p>\n            Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.\n          </p>\n          <p>\n            Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;\n          </p>\n        ',
  },
  // More questions...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const PictureSegment: React.FC<{ segment: PictureSegmentProps }> = ({ segment }) => {
  //const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="mt-4">
    <h1 className="sr-only">Recent questions</h1>
    <ul className="space-y-4">
      {questions.map((question) => (
        <li key={question.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby={'question-title-' + question.id}>
            <div>
              <h2 id={'question-title-' + question.id} className="mt-4 text-base font-medium text-gray-900">
                {segment.title}
              </h2>
            </div>
            <div
              className="mt-2 text-sm text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{ __html: segment.description}}
            />
             <div className="flex flex-wrap justify-center">
              <div className="w-6/12 sm:w-4/12 px-4">
                <img src={segment.url} alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" />
              </div>
            </div>
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
                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                    <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium text-gray-900">{question.replies}</span>
                    <span className="sr-only">replies</span>
                  </button>
                </span>
                <span className="inline-flex items-center text-sm">
                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium text-gray-900">{question.views}</span>
                    <span className="sr-only">views</span>
                  </button>
                </span>
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
                      <time dateTime={question.datetime}>{question.date}</time>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default PictureSegment;
