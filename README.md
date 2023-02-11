# 원티드 프리온보딩 프론트엔드 코스

# 1. 배포 링크

### https://pjs-wanted-pre-onboarding-frontend.netlify.app

# 2. 프로젝트 구조

```bash
📦 src
├── 📂 component
│   └── 📂 todo
│        ├── 📄 TodoForm
│        ├── 📄 TodoItem
│        └── 📄 TodoList
├── 📂 hooks
├── 📂 pages
│   ├── 📄 Home
│   ├── 📄 Signin
│   ├── 📄 Signup
│   └── 📄 todo
└── 📂 shared
```

# 3. 기능 시연 GIF

## 로그인 , 회원가입

<img src="https://user-images.githubusercontent.com/87622597/218252160-86bccb24-90b6-434e-bc85-78e552e91321.gif" width="500" height="450"/>

✅ Assignment 1

- 정규표현식을 이용해서 이메일과 비밀번호의 유효성 검사기능을 구현했습니다.
- 유효성검사에 속해있는 state들을 이용해
  - button의 disabled속성에 조건부로 true값을 지정해줍니다.
  - className을 조건부로 바꾸고 이를 통해 유효성 검사를 통과하지 못했을 경우의 className으로 조건부렌더링을 해줍니다.

✅ Assignment 2

- axios를 이용해 baseURL과 intercepters를 사용 모든 요청에 대해 같은 코드의 중복을 제거했습니다.
- App.js에 react-router-dom의 Routes를 이용하여 /signin경로를 지정해줍니다.
- react-router-dom의 useNavigate를 이용하여 회원가입이 성공했을 경우 statusText를 “Created”로 받는 것을 이용해 /signin 경로로 이동시킵니다.

✅ Assignment 3

- 서버와의 로그인관련 비동기통신이 성공했을 경우 statusText를 “OK”로 받는 것을 이용해 서버로 부터 받은 엑세스토큰을 로컬스토리지에 저장하고 /todo 경로로 이동시킵니다.

✅ Assignment 4

- useEffect를 이용해서 /signin, /signup, /todo의 초기렌더링시 localStorage.getItem을 이용해 로컬스토리지에 access_token이 있는지 확인하고 그 여부에 따라
  - 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시킵니다.
  - 로컬 스토리지에 토큰이 없는 상태로 /todo 페이지에 접속한다면 /signin 경로로 리다이렉트 시킵니다.

## Todo List

<img src="https://user-images.githubusercontent.com/87622597/218252162-d5580730-7fc7-4663-99ef-1a0809b61a54.gif" width="500" height="450"/>

✅ Assignment 5

- router를 통해 /todo경로에 접속하면 useTodo함수가 실행되어 useTodo내부의 useEffect를 통해 투두 목록을 가져옵니다.

✅ Assignment 6

- TodoForm 컴포넌트를 만들어 그 내부에서 내용을 추가할 수 있습니다.
- 빈칸일때는 input의 value값을 이용해서 판별한 후 제출함수를 바로 return시켜 제출하지 못하게 막았습니다.

✅ Assignment 7

- 체크박스의 onChange속성에 update함수를 넣어 체크박스가 바뀔때마다 그 값을 서버로 전달합니다.

✅ Assignment 8, 9

- 수정과 삭제는 button의 onClick속성을 이용해 서버로 전달합니다.

✅ Assignment 10

- modifyToggle이라는 상태를 따로 만들어 수정 버튼을 눌렀을 때는 조건부렌더링을 통해 새로운 input창이 뜨게 하였으며 그 값은 부모 컴포넌트로부터 받은 기존의 값을 넣었습니다.
- 제출하였을 시 유저가 빈칸으로 제출할경우 그 값의 boolean을 판단하여 빈칸일 경우 "할 일을 입력해 주세요” 라는 문구를 alert합니다.

추가 구현

- 로그아웃 (로컬 스토리지에서 삭제)

## 성능 최적화

# 4. 프로젝트 설치 및 실행

1. root 경로에 .env 파일 생성

```
REACT_APP_API_URL=https://pre-onboarding-selection-task.shop
```

2. 프로젝트 패키지 설치

```
npm install
```

3. 프로젝트 실행

```
npm start
```

# 5. 사용 라이브러리

axios

react-router-dom

styled-components
