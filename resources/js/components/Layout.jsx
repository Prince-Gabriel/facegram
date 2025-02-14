import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pb-8">
                {children}
            </main>
            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2024 Facegram. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}; 