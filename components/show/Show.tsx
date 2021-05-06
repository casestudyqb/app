import React from "react";
import Router from "next/router";

export type ShowProps = {
  id: number;
  name: string;
  description: string;
  picUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const Show = ({ post }) => {
    return (
      <div onClick={() => Router.push("/show/[id]", `/show/${post.id}`)}>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src={post.picUrl} alt={post.name}></img>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <a className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                          {post.name}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                          {post.description}
                      </p>
                    </a>
                </div>
            </div>
        </div>
      </div>
    );
  };
  

// const Show: React.FC<{ post: ShowProps }> = ({ post }) => {
//   const authorName = post.author ? post.author.name : "Unknown author";
//   return (
//     <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
//       <h2>{post.title}</h2>
//       <small>By {authorName}</small>
//       <ReactMarkdown source={post.content} />
//     </div>
//   );
// };

export default Show;