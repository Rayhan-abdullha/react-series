import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-4">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-2 bg-[#5f27cd] text-white rounded-md hover:bg-[#7d3cbe]">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
