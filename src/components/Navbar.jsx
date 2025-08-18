import "../styles/Navbar.css";

const Navbar = ({ mobileFiltersVisible, setMobileFiltersVisible }) => {
  return (
    <nav className="navbar">
      <h1 className="brand">NOMinate</h1>
      <h2 className="slogan">Dinner ideas, just a scroll away.</h2>

      {/* Hamburger for mobile */}
      <button
        className="hamburger"
        onClick={() => setMobileFiltersVisible((prev) => !prev)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
