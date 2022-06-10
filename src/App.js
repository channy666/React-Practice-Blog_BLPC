import styled from "styled-components";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import PostPage from "./pages/PostPage/PostPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ConferencesPage from "./pages/ConferencesPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ConferencePage from "./pages/ConferencePage";
import ForumsPage from "./pages/ForumsPage";
import ForumPage from "./pages/ForumPage";
import SearchPage from "./pages/SearchPage";
import { AuthContext } from "./context";
import { getAuthToken, setAuthToken } from "./utils/authorization";
import { getMe } from "./WebAPI";

const Wrapper = styled.div`
  min-height: 600px;
  min-width: 1200px;
`;

const Warning = styled.div`
  height: 35px;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  background: #c2c3de;
  color: black;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const WarningLink = styled.a`
  color: Crimson;

  :hover {
    color: #861587;
  }
`;

function App() {
  const [user, setUser] = useState();
  const [isConfirmingUser, setIsConfirmingUser] = useState(true);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok === 1) {
          setUser(res.data);
          setIsConfirmingUser(false);
          return;
        }
        setAuthToken("");
        setUser(null);
        setIsConfirmingUser(false);
      });
    } else {
      setUser(null);
      setIsConfirmingUser(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isConfirmingUser,
      }}
    >
      <Wrapper>
        <Router>
          <Warning>
            {`注意！本網站為練習用網站，欲前往清華大學區塊鏈法律與政策研究中心 `}
            <WarningLink
              href="https://www.facebook.com/BlockchainLawcenter/"
              target="_blank"
            >
              請按此
            </WarningLink>
          </Warning>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Posts/:category" element={<PostsPage />} />
            <Route path="/Post/:id" element={<PostPage />} />
            <Route path="/Conferences" element={<ConferencesPage />} />
            <Route path="/Conference/:index" element={<ConferencePage />} />
            <Route path="/Forums" element={<ForumsPage />} />
            <Route path="/Forum/:id" element={<ForumPage />} />
            <Route path="/ContactUs" element={<ContactUsPage />} />
            <Route path="/CreatePost" element={<CreatePostPage />} />
            <Route path="/Search/:value" element={<SearchPage />} />
            <Route path="/Login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </Wrapper>
    </AuthContext.Provider>
  );
}

export default App;
