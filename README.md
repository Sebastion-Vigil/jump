# jump

1. Square ascends at `upSpeed` until just before `targetHT` is reached
2. Right before `targetHT` is reached *(x% of `targetHT`?)*, `upSpeed` slows dramatically, becoming `finalUpSpeed`
3. Once `targetHT` is reached, before falling back to the ground, square will pause and hover very briefly
4. This simulates the effect of gravity taking over after the upward force has been expended

**`TargetHT` determined by `buttonPressDuration`**
- Minimum `targetHT` is 100px from ground.
- Maximum `targetHT` is 300px from ground.
- What is `upSpeed`?
  - What % of `upSpeed` is `finalUpSpeed`?
- What is `downSpeed`?
  - `downSpeed` is constant
- Are `upSpeed`/`downSpeed` the same?
- If not, which is greater?
- (leaning toward `upSpeed` being greater)

**handleJumpButton()**
- if jump already in progress, return/handle appropriately
- else set state `jumping` boolean to true
- determine `targetHT` based on `buttonPressDuration`
- invoke handleJumpPhysics(`targetHT`)

**handleJumpPhysics(tH)**
- send square up at `upSpeed` until *x%* of `targetHT` reached
- reduce `upSpeed` to `finalUpSpeed` until `targetHT` reached
- pause, letting square hover briefly 
- send square down at `downSpeed`
- set state `jumping` boolean to false

