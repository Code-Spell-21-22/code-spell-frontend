import './index.css';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import {Dashboard} from "./components/Dashboard/Dashboard";
import {Login} from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import {Levels} from "./components/Levels/Levels";
import {Level} from "./components/Level/Level";
import {Leaderboards} from "./components/Leaderboards/Leaderboards";
import {Achievements} from "./components/Achievements/Achievements";

let logged_in = false;

function App() {

    if (!logged_in) {
        return (<div style={{backgroundImage: "url(/Background_2.png)",
            backgroundRepeat:"no-repeat", backgroundSize:"cover", height: "100vh", width: "100vw"}}>
            <Container className="justify-content-center d-flex">
                <Router>
                    <Routes>
                        <Route path="/" element={<SignUp />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="*" element={<SignUp />}/>
                    </Routes>
                </Router>
            </Container>
        </div>
        );
    }


  return (
      <div style={{backgroundImage: "url(/Background_2.png)",
          backgroundRepeat:"no-repeat", backgroundSize:"cover", minHeight: "100vh", minWidth: "100vw"}}>
          <Row className="mx-5">
              <Router>
                  <Routes>
                      <Route  path="/" element={<Dashboard />}/>
                      <Route  path="/levels" element={<Levels />}/>
                      <Route  path="/levels/:level" element={<Level />}/>
                      <Route  path="/leaderboards" element={<Leaderboards />}/>
                      <Route  path="/achievements" element={<Achievements />}/>
                  </Routes>
              </Router>
          </Row>
      </div>
    );
}

export default App;
