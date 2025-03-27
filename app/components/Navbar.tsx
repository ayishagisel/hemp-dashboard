import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/landing" className="text-xl font-bold text-green-600 dark:text-green-400">
                Hempdash
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-green-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/customers"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-green-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Customers
              </Link>
              <Link
                href="/emails"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-green-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Emails
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 