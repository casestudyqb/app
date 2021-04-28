/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from 'react'
import Router from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

const CreateSegment: React.FC = ({props}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [episodeId, setEpisodeId] = useState("");
    const [segmentId, setSegmentId] = useState("");


    const [open, setOpen] = useState(false)

    const [openTab, setOpenTab] = React.useState(1);

    const cancelButtonRef = useRef()
  
    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const body = { title, description, url, image, episodeId, segmentId};
        await fetch(`http://localhost:3000/api/segment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setOpen(false)
        console.log("close", props)
        await Router.push(`/show/episode/${props.id}`);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <button 
            onClick={() => setOpen(true)}
            className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
            Add Segment
        </button>
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div> */}
                        <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Create Segment
                        </Dialog.Title>
                        </div>
                    </div>
                    <form onSubmit={submitData}>
                        <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="Think Tank"
                        >
                            <option>Carlito's Rapid Fire</option>
                            <option>Think Tank</option>
                            <option>Meme of The Week</option>
                        </select>
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <input
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            type="text"
                            value={title}
                            />
                            <textarea
                            cols={30}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            rows={8}
                            value={description}
                            />
                            <input
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="url"
                            type="text"
                            value={url}
                            />
                            <input
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
                            />
                        </div>
                        <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        </div>
                        {/* <input disabled={!description || !title} type="submit" value="Create" />
                        <a className="back" href="#" onClick={() => Router.push("/")}>
                        or Cancel
                        </a> */}
                    
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                                >
                                Create
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                                >
                                Cancel
                            </button>
                        </div>
                    </form>
                    </div>
                </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
      </>
    );
  };
  
  export default CreateSegment;
