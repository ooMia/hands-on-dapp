# HelloWorld

이름을 등록하고 조회할 수 있는 스마트 계약입니다.<br>단, 등록되지 않은 사용자의 이름을 조회하려고 하면 오류가 발생합니다.

## 사용 시나리오

### 이름 등록

1. 사용자는 자신의 이름을 등록하기 위해 `setName` 함수를 호출합니다.
   ```solidity
   HelloWorld.setName("Alice");
   ```
2. 이름이 성공적으로 등록되면 `Register` 이벤트가 발생합니다.

### 이름 조회

1. 사용자는 자신의 이름을 조회하기 위해 `getName` 함수를 호출합니다.
   ```solidity
   string memory myName = HelloWorld.getName();
   ```
2. 사용자는 다른 사용자의 이름을 조회하기 위해 `getName(address _address)` 함수를 호출할 수 있습니다.
   ```solidity
   string memory otherName = HelloWorld.getName(0x123...);
   ```

## 주의 사항 및 오류 발생 상황

### NameUnset 오류

- `getName` 또는 `getName(address _address)` 함수를 호출할 때, 호출자의 이름이 등록된 상태가 아니라면 `NameUnset` 오류가 발생합니다.
