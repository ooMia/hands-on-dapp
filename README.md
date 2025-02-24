# case3-e2e-test

`Hello, World!`를 출력하는 간단한 DApp

GET `/api/name` 요청으로 등록된 배포자의 이름 참조

- 하위 workspace로 Foundry 내장
- [playwright](https://playwright.dev/)로 e2e 테스트
- [ethers.js](https://docs.ethers.org/)로 컨트랙트 호출 결과 변환

```bash
npm install

npm start

npm test
```

### Sequence Diagram

```mermaid
sequenceDiagram

    actor U as User
    participant N as Node

    U ->> N: npm install
    U ->> N: npm start
    N -> N: npm prestart

    create participant F as Forge
    N ->> F: src/sol/build.sh
    F -->> F: Build contract with solc
    create participant A as Anvil
    N ->> A: start Anvil on :3000
    Note right of A: allow-origin :3000

    F -->> A: Deploy as the 9th admin

    box rgba(33,66,99,0.5) Foundry
    participant A
    participant F
    end

    create participant S as Server
    N ->> S: src/node/index.js<br>start Server on :3000

    Note over U,S: e2e interaction
    U ->> S: localhost:3000
    S ->> S: GET /api/name
    S ->> A: contract on 1st tx
    A -->> S: return address
    S ->> A: fetch getName()
    A -->> S: return "World"
    S -->> U: display "Hello, World!"
```
