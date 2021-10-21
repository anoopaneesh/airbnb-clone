import { useUser } from "@auth0/nextjs-auth0";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from 'next/head'
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const profile = () => {
  const gender_list = ["Not specified", "Male", "Female"];
  const { user } = useUser();
  const [editName, setEditName] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [gender, setGender] = useState(gender_list[0]);
  const [editEmail, setEditEmail] = useState(false);
  return (
    <div>
        <Head><title>Account | Airbnb-clone</title></Head>
      <Header navbarState={true} />
      <main className="max-w-5xl pt-36 mx-auto pb-10 px-8 sm:px-4">
        <section className="space-y-10">
          <h1 className="text-4xl font-bold">Account</h1>
          <div className="max-w-md space-y-2">
            <div className="flex justify-between font-bold">
              <p>Legal Name</p>
              <div
                onClick={() => setEditName((value) => !value)}
                className="text-green-800 cursor-pointer"
              >
                {editName ? "Cancel" : "Edit"}
              </div>
            </div>
            <p className="text-gray-600">{user?.name}</p>
            {editName && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-4 py-2 rounded-md w-full outline-none border border-gray-500 focus:border-green-800"
                />
                <button className="px-6 py-2 bg-green-700 font-bold rounded-md text-white">
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="max-w-md space-y-2">
            <div className="flex justify-between font-bold">
              <p>Gender</p>
              <div onClick={() => setEditGender(value => !value)} className="text-green-800 cursor-pointer">{editGender ? 'Cancel':'Edit'}</div>
            </div>
            <p className="text-gray-600">Not specified</p>
            {editGender && (
              <div className="space-y-4 items-start">
                  <div className="w-72">
                  <Listbox value={gender} onChange={setGender}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 border">
            <span className="block truncate">{gender}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {gender_list.map((g, gIdx) => (
                <Listbox.Option
                  key={gIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-500' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={g}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {g}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      </div>
                <button className="px-6 py-2 bg-green-700 font-bold rounded-md text-white">
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="max-w-md space-y-2">
            <div className="flex justify-between font-bold">
              <p>Email address</p>
              <div onClick={()=>setEditEmail(value => !value)} className="text-green-800 cursor-pointer">{editEmail ? 'Cancel' : 'Edit'}</div>
            </div>
            <p className="text-gray-600">{user?.email}</p>
            {editEmail && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md w-full outline-none border border-gray-500 focus:border-green-800"
                />
                <button className="px-6 py-2 bg-green-700 font-bold rounded-md text-white">
                  Save
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default profile;



export const getServerSideProps = withPageAuthRequired({
    getServerSideProps:async (context) => {
        return {
            props:{
            }
        }
    } 
}) 


