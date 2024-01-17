# Movingle 🔡
> 2024.01.11 ~ 2024.01.17 <br />
*for 2023 Winter Madcamp Week03 Project* <br/>

## 📁 프로젝트 소개
![main](https://github.com/seohee0925/Scenglish_Server/assets/102652293/db5a6d00-664c-487c-b84e-990701a9dee0)

📽️ **Movingle** <br />
**Movie + English** 의 합성어로 내가 좋아할 수 있는 영화/미국 드라마에서의 명대사를 바탕으로 발음 교정 및 단어 공부를 할 수 있도록 도와주는 웹사이트입니다.


### 📈 Datasets

- [🔗kaggle 데이터셋](https://www.kaggle.com/datasets/aliasgary/classic-movie-and-tv-quotes-memorable-lines) 이용해서 영화 명대사 수집 후 데이터 전처리 진행
- [🔗TMDB API](https://www.themoviedb.org/?language=ko) 이용해서 kaggle 데이터셋과 영화 title을 mapping하여 영화 overview와 poster을 연결

## 💻 프로젝트 기능
### 1️⃣ 로그인, 회원가입

- 토큰 저장
- 자동 로그인 체크할 경우 웹 브라우저를 껐다 켜도 로그인 상태 유지

### 2️⃣ 메인 페이지

- 홈페이지의 모든 사용자들이 영어 공부 완료한 영화들을 count하여 ‘Popular Movies on Movingle’로 영화 리스트
- 개봉일 순으로 ‘New Movies on Movingle’로 영화 리스트
- 랜덤으로 ‘Various Movies on Movingle’로 영화 리스트
- 로그인을 하지 않은 상태에서 영화 포스터를 누를 경우 로그인 페이지로 넘어감

### 3️⃣ 상세 페이지

- 녹음을 하고 점수를 계산 (STT (Speech-To-Text 이용)
- 문장에서 단어를 클릭하고 Complete 하면 내 단어장에 추가

### 4️⃣ 마이페이지

- 파파고 API를 이용하여 추가한 단어에 대해서 단어 뜻과 함께 저장
- tier는 contents수랑 words수에 따라서 결정
    - contents수는 words수에 비해 가중치를 10배 → 하나의 contents에 모르는 words가 10개 있을거라고 가정
- tier 종류
    - Master 🏅
    - Gold 🥇
    - Silver 🥈
    - Bronze  🥉

### 👩‍💻 개발 환경

- **FE**
    - React, Typescript
- **BE**
    - Server: Node js
    - DB: MySQL
    

### ERD
![ERD](https://github.com/seohee0925/Scenglish_Server/assets/102652293/53f2cc52-3abb-4a0d-a361-1b3d085fab5b)

## 🧑‍🤝‍🧑 팀원
<table border="" cellspacing="0" cellpadding="0" width="100%">
 <tr width="100%">
  <td align="center">Seohee Yoon</a></td>
  <td align="center">Seunchan Hwang</a></td>
 </tr>
 <tr>
  <td  align="center"><a href="mailto:appleid21@sookmyung.ac.kr"><img src="https://github.com/seohee0925/Scenglish_Server/assets/102652293/0609d0e9-9f88-435f-9f77-c92e215876c4" border="0" width="90px"></a></td>
  <td  align="center"><a href="mailto:chanee718@kaist.ac.kr"><img src="https://github.com/seohee0925/Scenglish_Server/assets/102652293/83c7a067-5e8d-4ad4-843c-191ab19aef44" border="0" width="90px"></a></td>
 </tr>
 <tr width="100%">
  <td  align="center"><a href="mailto:appleid21@sookmyung.ac.kr">appleid21@sookmyung.ac.kr</a></td>
  <td  align="center"><a href="mailto:chanee718@kaist.ac.kr">chanee718@kaist.ac.kr</a></td>
 </tr>
 <tr width="100%">
       <td  align="center"><p>Back-end</p></td>
       <td  align="center"><p>Front-end</p></td>
     </tr>
  </table>
