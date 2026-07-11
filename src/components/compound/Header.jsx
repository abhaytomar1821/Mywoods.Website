

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>Mywoods</h2>
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/woods">Woods</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cms">CMS</a></li>
        </ul>
      </nav>

      <button className="btn">Get Started</button>
    </header>
  );
}

export default Header;