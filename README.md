
## Table of Contents
1. [English Ver.](#english-ver)
2. [Korean Ver.](#korean-ver)

## English Ver.

# RealTime-Note: Collaborative Dcoument Tool

RealTime-Note is a program that not only allows document storage but also enables real-time collaboration with colleagues on documentation editing.

# Deployment Link
https://realtime-note7.netlify.app/

# Key Features
### Document Storage
Realtime-Note supports real-time data storage:
- Save documents using Save button.
- Auto-save every 20 seconds to minimize data loss.
- Update saved documents.
- View a list of documents saved by each account.

### Realtime Document Collaboration
Realtime-Note also supports real-time collaboration with others:
- Login feature: Login with a Google account.
- Display of a real-time collaborator.
- Real-time updates for document modifications made by collaborators.
- Real-time display of collaborator's cursor position on the screen.

# Getting Started
### Install dependencies
```
npm install
```
### Run the project.
```
npm run dev
```
This command runs the program in development mode. To view it in a browser, go to http://localhost:5173/. The page will reload when changes are made. Additionally, lint errors will be visible in the console.

# How to Use
- Visit the website and log in with your google account.
- Once logged in, click the `New Note` button to create a new document.
- Documents are automatically saved every 20 seconds, and you can manually save them using the `Save` button.
- When a document is saved, **a unique link is generated**. You can check it in the current page's url. Share this link to collaborate with a teammate.
- To access the link, collaborats also need to log in. After logging in, they will automatically join the document and gain editing and saving permissions.
- Users can see who is currently collaborating in real time on the screen.
- The collaborator's cursor position is displayed on the screen in real time.
- Click the `Note List` button to view the documents saved under the current account.
- On the `Note List` page, you can click on any doumentation to view and edit it.

# Conclusion
By using RealTime-Note, you can enhance work efficiency in the following ways:
1. Its intuitive UI and fast data saving allow you to quickly create notes whenever and whereever needed.
2. The auto-save feature minimizes the risk of data loss.
3. Real-time updates ensure seamless collaboration with colleagues.
4. You can access and edit all saved notes whenever necessary.


## Korean Ver.

# RealTime-Note: 문서 협업 툴

RealTime Note는 단순 문서 저장 뿐 아니라, 동료와 협업하여 실시간 문서 작업을 할 수 있게 해주는 프로그램입니다.

# 배포 링크
https://realtime-note7.netlify.app/

# 주요 기능
### 문서 저장
RealTime Note는 실시간 데이터 저장을 지원합니다 :
- Save 버튼을 이용한 저장
- 20초마다 자동 저장 - 수정 사항에 대해 저장하지 않는 실수 방지
- 저장된 문서에 대한 업데이트 가능
- 계정별 저장한 문서 리스트

### 문서 협업
RealTime Note는 협력자와의 실시간 협력도 지원합니다 :
- 로그인 기능 - Google 계정으로 로그인
- 실시간 접속자 표시
- 협력자의 문서 수정 - 실시간 업데이트를 보장합니다
- 협력자의 커서 위치 - 실시간으로 협렬자의 커서 위치를 화면에 보여줍니다

# 시작하기
### `npm 설치`
```
npm install
```
### `프로젝트 시작`
```
npm run dev
```
프로그램을 개발 모드에서 실행합니다. 브라우저에서 실행하려면 http://localhost:5173/ 로 접속하세요. 수정 사항이 생기면 페이지는 리로드 될 것입니다. 더불어, lint error를 콘솔에서 볼 수 있습니다.

# 사용 방법
- 홈페이지로 들어가서 Sign in with Google 버튼을 이용해 로그인을 합니다.
- 로그인이 된 상태이면 New Note 버튼을 눌러 새로운 문서를 작성할 수 있습니다.
- 문서는 20초마다 자동 저장되며, Save 버튼을 눌러 직접 저장할 수도 있습니다.
- 문서가 저장되면 새로운 링크가 생성이 되며, 이 링크를 통해 협업자가 접속할 수 있습니다.
- 링크에 접속하려면 마찬가지로 로그인을 해야하며, 로그인이 완료되면 자동으로 해당 문서에 접속이 되며, 수정 권한을 가지게 됩니다.
- 사용자는 현재 접속중인 협력자가 누구인지 해당 화면에서 실시간으로 확인할 수 있습니다.
- 협력자의 커서 위치를 화면에서 실시간으로 확인할 수 있습니다.
- Note List 버튼을 누르면 해당 계정으로 저장한 문서를 볼 수 있습니다.
- Note List 페이지에서 각 문서를 클릭하면 해당 문서를 볼 수 있고, 수정할 수 있습니다.

# 결론
RealTime Note를 활용하면 다음과 같은 방면에서 업무 효율을 높일 수 있습니다 :

1. 직관적인 UI, 빠른 데이터 저장으로 언제 어디서든 필요한 메모를 빨리 작성할 수 있습니다.
2. 자동 저장 기능 덕분에, 데이터 손실을 최소화할 수 있습니다.
3. 동료와 협업할 때, 실시간 업데이트를 보장합니다.
4. 작성한 메모에 대한 기록을 모두 볼 수 있으며, 언제든 수정 가능합니다.

