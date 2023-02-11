import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { blue, red, gray5, grayMultiply, mobile } from "../shared/style";
import { signinApi } from "../shared/api";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useInput("");
  const [emailError, setEmailError] = useState(false);
  const [emailNotice, setEmailNotice] = useState(true);
  const [password, setPassword] = useInput("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  // 로컬 스토리지 토큰 확인
  const is_token = localStorage.getItem("access_token") ? true : false;

  // 로그인 상태이면 todo 화면으로
  useEffect(() => {
    if (is_token) navigate("/todo");
  }, [is_token, navigate]);

  const emailFilter = useCallback((email) => {
    const filter = /@/;
    return filter.test(email);
  }, []);

  const emailChecker = useCallback(() => {
    if (!email.trim()) {
      setEmailError(true);
      setEmailNotice(true);
      return false;
    }
    if (!emailFilter(email)) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  }, [emailFilter, email]);

  const onBlurEmailInput = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim()) return;
      emailChecker();
      if (!email.trim()) {
        setEmailNotice(true);
        return;
      }
      setEmailNotice(false);
    },
    [emailChecker]
  );

  const passwordFilter = useCallback((password) => {
    const filter = /(?=.{8,})/;
    return filter.test(password);
  }, []);

  const passwordChecker = useCallback(() => {
    if (!password.trim()) {
      setPasswordError(true);
      return false;
    }
    if (!passwordFilter(password)) {
      setPasswordError(true);
      return false;
    }
    setPasswordError(false);
    return true;
  }, [password, passwordFilter]);

  const onBlurPasswordInput = useCallback(() => {
    setPasswordNotice(false);
    if (!passwordChecker()) return;
  }, [passwordChecker]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (emailError || !email.trim()) {
        emailRef.current.focus();
        return;
      }
      if (passwordError || !password.trim()) {
        passwordRef.current.focus();
        return;
      }

      signinApi(email, password)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/todo");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email, password, navigate, emailError, passwordError]
  );

  const onClickSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <Fragment>
      <Container>
        <Form onSubmit={onSubmit}>
          <EmailContainer>
            <EmailInput
              ref={emailRef}
              type="text"
              value={email}
              onChange={setEmail}
              onBlur={onBlurEmailInput}
              placeholder="email"
              data-testid="email-input"
            />
            {emailNotice && (
              <EmailAlarmText className="black">
                @를 포함해주세요.
              </EmailAlarmText>
            )}
            {!emailNotice && emailError && (
              <EmailAlarmText>@를 꼭 포함해주세요!</EmailAlarmText>
            )}
            {!emailNotice && !emailError && (
              <EmailAlarmText className="black">
                사용가능한 email 입니다.
              </EmailAlarmText>
            )}
          </EmailContainer>
          <PasswordContainer>
            <PasswordInput
              ref={passwordRef}
              type="password"
              value={password}
              onChange={setPassword}
              onBlur={onBlurPasswordInput}
              placeholder="password"
              data-testid="password-input"
            />
            {passwordNotice && (
              <PasswordAlarmText className="black">
                비밀번호는 8글자 이상으로 작성해주세요.
              </PasswordAlarmText>
            )}
            {!passwordNotice && passwordError && (
              <PasswordAlarmText>
                비밀번호는 꼭 8글자 이상으로 작성해주세요!
              </PasswordAlarmText>
            )}
            {!passwordNotice && !passwordError && (
              <PasswordAlarmText className="black">
                사용가능한 비밀번호입니다.
              </PasswordAlarmText>
            )}
          </PasswordContainer>
          <SigninButton
            className={
              !emailNotice && !emailError && !passwordNotice && !passwordError
                ? "possible"
                : null
            }
            type="submit"
            data-testid="signin-button"
            disabled={
              (!emailNotice && emailError) || (!passwordNotice && passwordError)
            }
          >
            로그인
          </SigninButton>
        </Form>
        <SignupContainer>
          <span>계정이 없으신가요? 지금 바로 가입하세요!</span>
          <SignupButton onClick={onClickSignup}>회원가입</SignupButton>
        </SignupContainer>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 620px;
  width: 90%;
  height: 750px;
  min-height: 100vh;
  padding-bottom: 40px;
  margin: auto;

  @media screen and (max-width: ${mobile}) {
    align-items: unset;
    height: 550px;
    padding-bottom: 60px;
  }
`;

const Form = styled.form`
  position: relative;
  top: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 416px;
  font-size: 20px;
  padding: 40px 50px 50px;
  border: 2px solid ${blue};
  border-radius: 10px;
  box-sizing: border-box;

  @media screen and (max-width: ${mobile}) {
    top: 20px;
  }
`;

const EmailContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 70px;
  font-size: 12px;
  color: ${red};
`;

const EmailInput = styled.input`
  max-width: 400px;
  width: 100%;
  height: 48px;
  border: 1px solid ${gray5};
  border-radius: 7px;
  background-color: ${grayMultiply};
  padding-left: 20px;
  margin: 0 auto 3px;
  box-sizing: border-box;

  ::placeholder {
    font-size: 14px;
  }
`;

const EmailAlarmText = styled.span`
  margin: 3px 0 0;
  &.black {
    color: black;
  }
`;

const PasswordAlarmText = styled.span`
  margin: 3px 0 0;
  &.black {
    color: black;
  }
`;

const PasswordContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 70px;
  font-size: 12px;
  color: ${red};
`;

const PasswordInput = styled.input`
  max-width: 400px;
  width: 100%;
  height: 48px;
  border: 1px solid ${gray5};
  border-radius: 7px;
  background-color: ${grayMultiply};
  padding-left: 20px;
  margin: 0 auto 3px;
  box-sizing: border-box;

  ::placeholder {
    font-size: 14px;
  }
`;

const SigninButton = styled.button`
  position: relative;
  top: 60px;
  width: 180px;
  height: 40px;
  margin: 0 0 10px;
  background-color: ${gray5};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &.possible {
    background-color: ${red};
  }
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 220px 0 0;
  font-size: 12px;
  font-weight: 500;

  @media screen and (max-width: ${mobile}) {
    margin: 30px 0;
  }
`;

const SignupButton = styled.button`
  position: relative;
  width: 180px;
  height: 40px;
  margin: 15px 0 0;
  background-color: white;
  color: ${red};
  font-size: 16px;
  border: 1px solid ${red};
  border-radius: 10px;
  cursor: pointer;
`;

export default Signin;
