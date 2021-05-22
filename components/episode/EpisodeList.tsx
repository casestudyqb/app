import React from "react";
import Link from 'next/link'
import Router from "next/router";
//import ReactMarkdown from "react-markdown";
import { format, compareAsc } from 'date-fns'

export type EpisodeListProps = {
  id: number;
  description: string;
  episodeNum: number;
  dateAired: string;
  show:[{
    name: string;
  }]
  participants: [{
    image: string;
    name: string;
  }];
};

const EpisodeList: React.FC<{ episode: EpisodeListProps }> = ({ episode }) => {
  //const authorName = post.author ? post.author.name : "Unknown author";
  return (
        // <!-- Projects table (small breakpoint and up) -->
        <tbody className="bg-white divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600" aria-hidden="true"></div>
                  <Link href={`/show/episode/${episode.id}`}>
                    <a className="truncate hover:text-gray-600">
                      <span>
                        {episode.episodeNum}
                        <span className="text-gray-500 font-normal"> {episode.description}</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </td>
              <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                  {episode.participants.map((pics, index)=>(
                    <img key={index} className="max-w-none h-6 w-6 rounded-full ring-2 ring-white" src={pics.image} alt={pics.name}/>
                  ))}
                  </div>
                  {/* <span className="flex-shrink-0 text-xs leading-5 font-medium">+8</span> */}
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {format(new Date(episode.dateAired), 'MM/dd/yyyy pp')}
              </td>
              <td className="pr-6">
                <div className="relative flex justify-end items-center">
                  <button type="button" className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" id="project-options-menu-0" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open options</span>
                    {/* <!-- Heroicon name: solid/dots-vertical --> */}
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
  
                  {/* <!--
                    Dropdown menu, show/hide based on menu state.
  
                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  --> */}
                  
                </div>
              </td>
            </tr>
          </tbody>

  );
};

export default EpisodeList;
