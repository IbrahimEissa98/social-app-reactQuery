import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <section className="w-full">
        <div className="text-center">
          <div className="not-found-page rounded-2xl h-96 bg-no-repeat bg-top bg-cover">
            <h1 className="text-center text-blue-500 text-7xl">404</h1>
          </div>
          <div className="font-mono mt-3">
            <h3 className="text-2xl">Look like you're lost</h3>
            <p className="text-2xl">
              The page you are looking for not avaible!
            </p>
            <Link
              to={"/"}
              className="bg-primary text-white px-5 py-2.5 mt-5 inline-block rounded-xl"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
