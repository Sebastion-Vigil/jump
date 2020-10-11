# jump

## Square ascends at `upSpeed` until just before `targetHT` is reached.
## Right before `targetHT` is reached *(x% of `targetHT`?)*, `upSpeed` will slow to a fraction of itself, becoming `finalUpSpeed`. 
## Once `targetHT` is reached, before falling back to the ground, 
## square will appear to pause and hover very briefly, simulating 
## the effect of gravity taking over after the force of the upward 
## thrust has been expended.

`TargetHT` determined by duration of button press
- Minimum `targetHT` is 100px from ground.
- Maximum `targetHT` is 300px from ground.
- What is `upSpeed`?
  - What % of `upSpeed` is `finalUpSpeed`?
- What is `downSpeed`?
  - `downSpeed` is constant
- Are `upSpeed`/`downSpeed` the same?
- If not, which is greater?
- (leaning toward `upSpeed` being greater)

handleJumpButton()
- if jump already in progress, return/handle appropriately
- else set state `jumping` boolean to true
- determine `targetHT` based on button press duration
- invoke handleJumpPhysics(`targetHT`)

handleJumpPhysics(tH)
- send square up at `upSpeed` until *x%* of `targetHT` reached
- reduce `upSpeed` to `finalUpSpeed` until `targetHT` reached
- pause, letting square hover briefly 
- send square down at `downSpeed`
- set state `jumping` boolean to false

