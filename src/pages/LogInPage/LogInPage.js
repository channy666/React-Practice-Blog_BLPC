/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import styled from "styled-components";
import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerOrLogin, getMe } from "../../WebAPI";
import { setAuthToken, getAuthToken } from "../../utils/authorization";
import { AuthContext } from "../../context";

const Root = styled.div`
  margin: 30px 0;
  height: 700px;
`;

const LogInContainer = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 50px 0px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Register = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  height: 55px;
  background: linear-gradient(to right, #50256c, #2348a0);
  letter-spacing: 20px;
  cursor: pointer;
  font-weight: bold;

  ${(props) =>
    !props.$active &&
    `
      background: #e8e5f8;
      color: #9e9e9f;

      :hover {
        color: #50256c;
      }
  `}
`;

const LogIn = styled(Register)``;

const ContentContainer = styled.div`
  background: #e8e5f8;
  width: 100%;
  padding-top: 70px;
  box-sizing: border-box;
  border: 4px solid #000;
  border-image-source: linear-gradient(to right, #50256c, #2348a0);
  border-image-slice: 20;
  height: 550px;
`;

const Username = styled.div`
  display: flex;
  margin: 0px 0px 60px 18%;
  font-size: 18px;
  align-items: center;

  input {
    width: 50%;
    height: 30px;
    margin-left: 1%;

    ::placeholder {
      color: #b4b4b5;
    }
  }

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 45px 0px 90px 18%;
  `}
`;

const Nickname = styled(Username)``;

const Password = styled(Username)`
  margin: 0px 0px 40px 18%;

  ${(props) =>
    props.$isLoginMode &&
    `
    margin: 45px 0px 55px 18%;
  `}
`;

const TogglePassword = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: #888888;
  margin-left: 3%;

  :hover {
    color: #50256c;
  }
`;

const Submit = styled.button`
  display: flex;
  cursor: pointer;
  background: #50256c;
  color: white;
  border-radius: 3px;
  width: 30%;
  height: 45px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 30px auto;
  font-size: 18px;
  letter-spacing: 12px;
  font-weight: bold;
  padding-left: 10px;
  border: none;

  :hover {
    background: #2348a0;
  }
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  margin-left: 18%;
  font-size: 16px;
  visibility: hidden;
  height: 30px;

  ${(props) =>
    props.$hasError &&
    `
    visibility: visible;
  `}
`;

const Reminder = styled.div`
  color: #50256c;
  margin: 0 0 15px 18%;

  span {
    font-weight: bold;
    color: white;
    background: #50256c;
    padding: 1px 3px;
    letter-spacing: 2px;
  }
`;

const SuccessMessageContainer = styled(ContentContainer)``;

const SuccessMessageContent = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #50256c;
  margin: 30px auto;
  text-align: center;
  padding-bottom: 30px;
`;

const ToHomePageButton = styled(Submit)``;

function LogInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      window.scrollTo(0, 0);
      return;
    }
    if (getAuthToken() && user) {
      navigate("/");
    } else {
      setUser(null);
      setAuthToken("");
    }
  }, [user, successMessage]);

  const handleModeChange = useCallback(
    (mode) => {
      if (
        (mode === "Register" && isRegisterMode) ||
        (mode === "LogIn" && !isRegisterMode)
      ) {
        return;
      }
      setIsRegisterMode((prevState) => !prevState);
    },
    [isRegisterMode]
  );

  const handleTogglePassword = useCallback(() => {
    setPasswordShown((prevState) => !prevState);
  }, []);

  const handleInputFocus = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleNicknameChange = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (username && password && (isRegisterMode ? nickname : true)) {
      registerOrLogin(username, password, isRegisterMode ? nickname : false)
        .then((data) => {
          if (data.ok !== 1) {
            return setErrorMessage(data.message);
          }
          setAuthToken(data.token);
          getMe().then((res) => {
            if (res.ok !== 1) {
              setErrorMessage(res.message);
              setAuthToken("");
              return;
            }
            setSuccessMessage(true);
            setUser(res.data);
          });
        })
        .catch(() => setErrorMessage("伺服器異常，請稍後再試"));
      return;
    }
    setErrorMessage("請確實填寫所有欄位！");
  };

  const handleToHomePageButtonClick = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <Root>
      <LogInContainer>
        <TitleContainer>
          <Register
            $active={isRegisterMode}
            onClick={() => handleModeChange("Register")}
          >
            註冊
          </Register>
          <LogIn
            $active={!isRegisterMode}
            onClick={() => handleModeChange("LogIn")}
          >
            登入
          </LogIn>
        </TitleContainer>
        {!successMessage && (
          <ContentContainer>
            <form onSubmit={handleFormSubmit}>
              <Username $isLoginMode={!isRegisterMode}>
                帳號：
                <input
                  type="text"
                  placeholder="請輸入帳號"
                  onFocus={handleInputFocus}
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Username>
              {isRegisterMode && (
                <Nickname>
                  暱稱：
                  <input
                    type="text"
                    placeholder="請輸入暱稱"
                    onFocus={handleInputFocus}
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                </Nickname>
              )}
              <Password $isLoginMode={!isRegisterMode}>
                密碼：
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="請輸入密碼"
                  onFocus={handleInputFocus}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <TogglePassword onClick={handleTogglePassword}>
                  {passwordShown ? "隱藏密碼" : "顯示密碼"}
                </TogglePassword>
              </Password>
              {isRegisterMode && (
                <Reminder>
                  本網站為練習用，註冊後會將您的密碼更改為 <span>123456</span>
                </Reminder>
              )}
              {!isRegisterMode && (
                <Reminder>
                  本網站為練習用，登入密碼請輸入 <span>123456</span>
                  <div>若還是無法登入，請重新註冊</div>
                </Reminder>
              )}
              <Error $hasError={errorMessage}>{errorMessage}</Error>
              <Submit>{isRegisterMode ? "註冊" : "登入"}</Submit>
            </form>
          </ContentContainer>
        )}
        {successMessage && (
          <SuccessMessageContainer>
            <SuccessMessageContent>{`${
              isRegisterMode ? "註冊" : "登入"
            }成功！`}</SuccessMessageContent>
            <ToHomePageButton onClick={handleToHomePageButtonClick}>
              返回首頁
            </ToHomePageButton>
          </SuccessMessageContainer>
        )}
      </LogInContainer>
    </Root>
  );
}

export default LogInPage;
