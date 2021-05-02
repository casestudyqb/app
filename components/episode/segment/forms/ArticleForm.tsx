import React, { useState, useRef } from 'react';

export default function ArticleForm({submitData, closeModal, getData}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [episodeId, setEpisodeId] = useState("");
  const [segmentId, setSegmentId] = useState("");

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef()

  return (
    <form onSubmit={submitData}>
     <div>
         <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
             Article Website
         </label>
         <div className="mt-1 flex rounded-md shadow-sm">
             <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
             http://
             </span>
             <input
             type="text"
             name="article_website"
        
             className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
             placeholder="www.example.com"
             onChange={(e) => setUrl(e.target.value)}
             value={url}
             />
         </div>
     </div>
     <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
             Article Title
         </label>
         <div className="mt-1">
             <input
             type="text"
             name="title"
             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
             placeholder="Title"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             />
         </div>
     </div>
     <div className="sm:col-span-6">
         <label htmlFor="about" className="block text-sm font-medium text-gray-700">
             Description
         </label>
         <div className="mt-1">
             <textarea
             name="description"
             rows={3}
             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
             onChange={(e) => setDescription(e.target.value)}
             value={description}
             />
         </div>
     </div>
     {/* <input
     onChange={(e) => setImage(e.target.value)}
     placeholder="image"
     type="text"
     value={image}
     />
     <input
     onChange={(e) => setEpisodeId(e.target.value)}
     placeholder="episodeId"
     type="text"
     value={episodeId}
     />
     <input
     onChange={(e) => setSegmentId(e.target.value)}
     placeholder="segmentId"
     type="text"
     value={segmentId}
     /> */}
     <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
         <button
            onClick={()=> getData({title, description, url, image, episodeId, segmentId})}
             type="submit"
             className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
             >
             Create
         </button>
         <button
             type="button"
             className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
             onClick={closeModal}
             ref={cancelButtonRef}
             >
             Cancel
         </button>
     </div>
 </form>
  );
}