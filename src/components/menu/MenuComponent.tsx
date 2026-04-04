import {Component} from "react";
import reactLogo from '/src/assets/react.svg'
import {Link} from "react-router-dom";

type RouteLink = {
    label: string
    to: string
}
export class MenuComponent extends Component {
    private readonly routeLinks : { routeLink:RouteLink,routeLinks:RouteLink[] }[] = [
        {routeLink : {label : 'home' , to : ''} , routeLinks : []},
        {routeLink : {label : 'about' , to : ''} , routeLinks : []},
        {routeLink : {label : 'contact' , to : ''} , routeLinks : []},
        {routeLink : {label : 'program' , to : ''} , routeLinks : [
                {label : 'crud student' , to : '/crud-student'},
            ]
        },
    ]
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <nav className="navbar bg-light">
                        <div className="container">
                            <a className="navbar-brand" >
                                <img src={reactLogo} alt="Bootstrap" width="30" height="24"/>
                            </a>
                        </div>
                    </nav>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {this.routeLinks.map((item, i) =>
                                (item.routeLinks.length === 0)
                                    ?
                                    <li className="nav-item" key={i}>
                                        <Link className="nav-link active"  to={item.routeLink.to}>{item.routeLink.label}</Link>
                                    </li>
                                    :
                                    <li key={i} className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                           aria-expanded="false">
                                            {item.routeLink.label}
                                        </a>
                                        <ul className="dropdown-menu">
                                            {item.routeLinks.map((item, i) =>
                                                <li key={i+100}>
                                                    <Link className="dropdown-item" to={item.to}>{item.label}</Link>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}