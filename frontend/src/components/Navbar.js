// // Navigation bar component
// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <h2>UberEATS Prototype</h2>
//       <div style={styles.links}>
//         <Link to="/" style={styles.link}>Home</Link>
//         <Link to="/signup" style={styles.link}>Signup</Link>
//         <Link to="/login" style={styles.link}>Login</Link>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "15px 20px",
//     backgroundColor: "#ff9900",
//     color: "white",
//     fontSize: "18px",
//   },
//   links: {
//     display: "flex",
//     gap: "15px",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
// };

// export default Navbar;
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.navbar}>
      <h2>UberEATS Prototype</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {!user ? (
          <>
            <Link to="/signup" style={styles.link}>Signup</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    backgroundColor: "#00623b",
    color: "white",
    fontSize: "18px",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "darkgreen",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
