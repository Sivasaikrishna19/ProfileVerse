import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center">
      {process.env.NODE_ENV === "production" ? (
        <div className="text-center">
          <div className="animate-pulse">
            <div className="text-4xl font-bold">Work in Progress</div>
            {/* <div className="mt-2 text-xl">
              We are building something amazing!
            </div> */}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-pulse">
            <div className="text-4xl font-bold">Work in Progress</div>
            {/* <div className="mt-2 text-xl">
              We are building something amazing!
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
