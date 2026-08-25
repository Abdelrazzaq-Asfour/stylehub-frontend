export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-6 text-center text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} StyleHub. All rights reserved.</p>
        <p className="text-indigo-400 font-medium">Enterprise Salon Management System</p>
      </div>
    </footer>
  );
}