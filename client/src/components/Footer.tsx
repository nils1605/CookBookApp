// components/Footer.tsx
import '../styles/global.css';
export default function Footer() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} CookBook. Built with love for foodies.</p>
      </footer>
    );
  }
  