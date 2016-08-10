# Digger VR

A browser based 'Minecraft' meets 'Terraria' kind of idea with things like gamepad and VR support thrown in the mix.

**To run:**
clone the repo then run:

npm install
npm start

Navigate to localhost:3000
  
**Current working feature set:**

+ Movement, 'stepping' and jumping
+ Collision detection
+ Single block digging
+ Grass / Dirt / Rocks - block types
+ World edges work, but will fall through bottom
+ World size upto 256 x 256 x 256 (currently set to 64 for testing)
+ Mouse and keyboard support
+ Gamepad / Controller support
+ Google cardboard with head tracking support
(Runs in VR mode automatically if on a device with direction sensor)
(You will need a controller to move while in VR mode)

**Roadmap:**

+ ~~Cardboard barrel distorion~~
+ Impenetrable blocks at bottom of map
+ Perform 'area' directional digging if hold down dig button
+ Support upto 2048 maps (more than 512 will probably wreck a browser though)
+ Map generation progress indicator
+ Saving and loading of maps to a server
+ Keeping map changes (digging) in sync with a server
+ Block placement

+ More to be decided on...