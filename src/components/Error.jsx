import React from 'react'

const Error = ({message}) => {
    return (
        <div className="w-full min-h-[89vh] flex justify-center items-center">
          <p className="font-bold w-full text-center text-red-500 max-w-md bg-red-200 border-2 border-red-400 px-3 py-4 rounded-md">
            {message}
          </p>
        </div>
      );
}

export default Error