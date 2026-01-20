import Link from 'next/link';
import { Newspaper } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 text-foreground mb-4">
              <Newspaper className="h-8 w-8" />
              <span className="text-2xl font-bold">NewsHub</span>
            </Link>
            <p className="text-muted-foreground">
              Your trusted source for the latest news and updates from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/politics" className="text-muted-foreground hover:text-primary transition-colors">
                  Politics
                </Link>
              </li>
              <li>
                <Link href="/category/tech" className="text-muted-foreground hover:text-primary transition-colors">
                  Tech
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-muted-foreground hover:text-primary transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-muted-foreground hover:text-primary transition-colors">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}