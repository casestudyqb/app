/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import Router from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"

export default function CreateEpisode({props}) {
  const [open, setOpen] = useState(false)
  const [dateAired, setDateAired] = useState(new Date());
  const [description, setDescription] = useState("");

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
        //setLoading(true)
        const body = { dateAired, description, showId: props.id };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/episode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        await Router.push(`/show/${props.id}`);
        setOpen(false)
        //setLoading(false)
        
        } catch (error) {
            console.error(error);
        }

        setOpen(false)
    };

  return (
    <>
        <button 
            onClick={() => setOpen(true)}
            className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
            Add Episode
        </button>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
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
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className="mt-3 sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                                Add Episode
                            </Dialog.Title>
                            {/* description, dateaired */}
                            <div className="mt-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <input
                                    type="text"
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    id="description"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="description"
                                    />
                                </div>
                            </div>
                            <div className="mt-40 overflow-visible">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Air Date & Time
                                </label>
                                <DateTimePicker
                                className="overflow-visible"
                                    onChange={setDateAired}
                                    value={dateAired}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={submitData}
                        >
                        Go back to dashboard
                        </button>
                    </div>
                    </div>
                </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    </>
  )
}

// /* This example requires Tailwind CSS v2.0+ */
// import React, { Fragment, useRef, useState } from 'react'
// import Router from 'next/router'
// import { Dialog, Transition } from '@headlessui/react'
// // import ArticleForm from './forms/ArticleForm'
// // import TextForm from './forms/TextForm'
// // import PictureForm from './forms/PictureForm'

// type Props = {
//     props: {
//         id: number;
//     }
//   };

// const CreateEpisode: React.FC<Props> = ({ props }) => {
//     const [data, setData] = useState({});
//     const [open, setOpen] = useState(false)

//     const [openTab, setOpenTab] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const cancelButtonRef = useRef()
  
//     const submitData = async (e: React.SyntheticEvent) => {
//       e.preventDefault();

//       try {
//         setLoading(true)
//         const body = data ; // data from Segement Form - Article, Picture, Text, etc.
//         await fetch(`${process.env.NEXT_PUBLIC_API_URL}/segment`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         });
//         setOpen(false)
//         setLoading(false)
//         await Router.push(`/show/episode/${props.id}`);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     return (
//       <>
//         <button 
//             onClick={() => setOpen(true)}
//             className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//             Add Segment
//         </button>
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog
//                 as="div"
//                 static
//                 className="fixed z-10 inset-0 overflow-y-auto"
//                 initialFocus={cancelButtonRef}
//                 open={open}
//                 onClose={setOpen}
//             >
//                 <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 {/* This element is to trick the browser into centering the modal contents. */}
//                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//                     &#8203;
//                 </span>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                     enterTo="opacity-100 translate-y-0 sm:scale-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                     <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//                     <div>
//                         {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//                         <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
//                         </div> */}
//                         <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
//                             Create Segment
//                         </Dialog.Title>
//                         </div>
//                     </div>test
//                         {/* <select
//                             id="location"
//                             name="location"
//                             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                             defaultValue="Think Tank"
//                             onChange={(e)=>setOpenTab(parseInt(e.target.value))}
//                         >
//                             <option value={1}>Carlito's RunDown</option>
//                             <option value={2}>Think Tank</option>
//                             <option value={3}>Meme of The Week</option>
//                             <option value={4}>Corporate Death Penalty</option>
//                         </select>
//                         <div className={openTab === 1 ? "block" : "hidden"} id="link1">
//                             { openTab === 1 ? <ArticleForm 
//                                                 submitData={submitData} 
//                                                 getData={data => {
//                                                     data.segmentId = openTab
//                                                     data.episodeId = props.id
//                                                     setData(data)
//                                                 }}
//                                                 closeModal={() => setOpen(false)}
//                                                 loading={loading}
//                                                 /> : null 
//                             }
//                         </div>
//                         <div className={openTab === 2 ? "block" : "hidden"} id="link1">
//                             { openTab === 2 ? <TextForm 
//                                                     submitData={submitData} 
//                                                     getData={data => {
//                                                         data.segmentId = openTab
//                                                         data.episodeId = props.id
//                                                         setData(data)
//                                                     }}
//                                                     closeModal={() => setOpen(false)}
//                                                     loading={loading}
//                                                 /> : null }
//                         </div>
//                         <div className={openTab === 3 ? "block" : "hidden"} id="link1">
//                             { openTab === 3 ? <PictureForm 
//                                                     submitData={submitData} 
//                                                     getData={data => {
//                                                         data.segmentId = openTab
//                                                         data.episodeId = props.id
//                                                         setData(data)
//                                                     }}
//                                                     closeModal={() => setOpen(false)}
//                                                     loading={loading}
//                                                 /> : null }
//                         </div>
//                         <div className={openTab === 4 ? "block" : "hidden"} id="link1">
//                             { openTab === 4 ? <TextForm 
//                                                     submitData={ submitData} 
//                                                     getData={data => {
//                                                         data.segmentId = openTab
//                                                         data.episodeId = props.id
//                                                         setData(data)
//                                                     }}
//                                                     closeModal={() => setOpen(false)}
//                                                     loading={loading}
//                                                 /> : null }
//                         </div> */}
//                         {/* <input disabled={!description || !title} type="submit" value="Create" />
//                         <a className="back" href="#" onClick={() => Router.push("/")}>
//                         or Cancel
//                         </a> */}
                    
//                         {/* <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
//                             <button
//                                 type="submit"
//                                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
//                                 >
//                                 Create
//                             </button>
//                             <button
//                                 type="button"
//                                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
//                                 onClick={() => setOpen(false)}
//                                 ref={cancelButtonRef}
//                                 >
//                                 Cancel
//                             </button>
//                         </div> */}
                
//                     </div>
//                 </Transition.Child>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//       </>
//     );
//   };
  
//   export default CreateEpisode;
