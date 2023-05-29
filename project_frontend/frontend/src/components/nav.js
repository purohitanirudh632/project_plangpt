import React from "react";

function Nav() {
    return(
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <h1 className="navbar-brand">PlanGpt</h1>
    <form className="d-flex">
      <button className="btn" type="submit">Login</button><button className="btn " type="submit">signup</button>
    </form>
  </div>
</nav>
    )

}

export default Nav;