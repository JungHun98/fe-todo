# fe-todo
## Achitecture
![20230703_181212](https://github.com/JungHun98/fe-todo/assets/97653343/503a5911-d86f-4667-87c7-0d6d11f53c2f)

> 현대자동차그룹 소프티어 부트캠프 1주차 미션<br>
> 개발기간: 2023.07.03~2023.07.05

## 기술스택
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

## 주요 기능
### :star: Show
> show${type}

- type: "all", "todo", "doing", "done"
  
### :star: Add
> add${name}${tags}

- name: string
- tags: string, 배열 형태의 문자열 (ex. '["favorite", "study"]')
### :star: Delete
> delete${id}

- id: Number
  
### :star: Update
> update${id}${status}

- id: Number
- status: "todo", "doing", "done"
  
## 디렉토리 구조
```
fe-todo
├─ add.js
├─ delete.js
├─ grade.js
├─ package.json
├─ show.js
├─ todo.js
├─ update.js
└─ validationAPI.js
```

## 설치 및 실행
이 저장소를 클론하고 다음 명령어를 입력하여 애플리케이션을 실행 할 수 있습니다.

### 실행
```
$ node grade.js 
```
