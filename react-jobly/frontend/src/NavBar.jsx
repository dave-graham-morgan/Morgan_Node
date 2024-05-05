import { Nav, NavItem } from 'reactstrap'; // assuming you are using reactstrap for the layout
import { NavLink } from 'react-router-dom'; // Import from react-router-dom for SPA navigation

function NavBar() {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/Jobs" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Jobs
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/Companies" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Companies
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/Profile" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    Profile
                </NavLink>
            </NavItem>
        </Nav>
    );
}

export default NavBar;
