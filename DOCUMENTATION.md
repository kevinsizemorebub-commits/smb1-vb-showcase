# SMB1 Stereo capture and conversion notes

## Result

The supplied V3 cartridge successfully completed World 1-1 in Beetle VB. The recording includes boot/title, the opening overworld, the underground pipe route, return to the overworld, the final staircase, flagpole, castle score tally, and the World 1-2 title screen. Mario keeps all three lives, collects nine coins and finishes with 19,650 points.

The output is an uncut **45.295404814-second** replay containing **2,277 emulator display frames**. This duration includes title and transition time and is not a speedrun timing claim.

## Capture provenance

| Item | Value |
|---|---|
| Cartridge | `smb1-vb.vb`, supplied Speed Fix V3 |
| Size | 262,144 bytes / 256 KiB |
| SHA-256 | `d9952d28f0dd29a7da6ac5bcc377a8760bdc09d4856a5bf286091ba0b166c8fe` |
| Emulator | Supplied Windows x64 Beetle VB libretro core |
| CPU mode | Accurate |
| Presentation | Red, side-by-side, separation 0 |
| Game depth | Default 1 |
| Core-reported display rate | 50.27 Hz |
| Core-reported audio rate | 44,100 Hz, stereo |
| Gameplay target | 60 updates per second, using the V3 hardware-timer implementation |
| Single-eye video | 1152 × 672, H.264 with AAC audio |
| Stereo video | 1536 × 448, H.264 with AAC audio |
| Scaling | Integer nearest-neighbor; no interpolation |

The core produces a 768 × 224 side-by-side framebuffer. The single-eye presentation uses its left 384 × 224 half. Both eye views are retained in the stereo video and the `-stereo.png` screenshots. The raw frame cadence is preserved; encoding speed does not determine playback speed. Audio samples are collected directly from the core.

## Route and controls

[Saradoc's Any% Strategy guide](https://www.speedrun.com/smb1/guides/frxdu), accessed September 19, 2026, provided the underground-shortcut route reference. The final button timings were tested on this conversion rather than copied from a NES movie. The run includes cautious pipe and staircase jumps and a low flagpole grab; it is not optimized to the guide's benchmark.

1. Start the game from the title screen and run right.
2. Jump through the opening obstacles and over the pipes.
3. Land on the fourth pipe and press Down to enter the underground room.
4. Jump onto the coin platform and collect coins while moving right.
5. Drop to floor level, then enter the exit pipe from the left.
6. Emerge above ground and jump across the brick platform.
7. Pass the last pipe and climb the staircase with successive jumps.
8. Reach the flagpole, complete the castle tally and wait for World 1-2.

| Action | Windows launcher | Virtual Boy | Libretro joypad ID used |
|---|---|---|---|
| Right | Right arrow | Left D-pad Right | 7 |
| Left | Left arrow | Left D-pad Left | 6 |
| Down / pipe | Down arrow | Left D-pad Down | 5 |
| Jump | X | A | 8 |
| Run | Z | B | 0 |
| Start | Enter | Start | 3 |

Other launcher controls: Right Shift selects players; Page Up and Page Down adjust stereo depth; Escape exits Mednafen.

## Reproducing the input replay

Use the supplied conversion's `tools/emulator_harness.py` with its matching ROM and ELF symbol file, plus a compatible Beetle VB core. The harness needs Python, NumPy and Pillow. Initialize it using its documented `--core` argument.

1. Run 100 emulator frames with no buttons.
2. Run 5 emulator frames with Start (ID 3).
3. Run 170 emulator frames with no buttons.
4. Load `route.json`. Each entry is `[number_of_display_frames, held_button_ids]`. Hold exactly that set for the specified number of calls to `retro_run`, then replace it with the next set.
5. Capture the video callback after each frame and collect the audio batch callbacks.
6. Query `retro_get_system_av_info` for video and audio timing. The capture used the rates listed above.

This replay starts at normal boot. Do not call the old smoke-test helper that seeds world/level memory. The final capture does not load checkpoints or modify game RAM. `capture-report.json` records every action boundary, the screenshots' times and state, and the final state. Its world and level values are zero-indexed, so `world: 0, level: 1` means World 1-2. The `lives: 2` byte represents three displayed lives.

## Verification performed

- During the active replay, every frame was checked for a change to the lives byte and the death engine routine (`engine: 11`). Neither occurred.
- The final state advanced from World 1-1 to World 1-2, with the corresponding title screen visually inspected.
- Screenshots come from the same final recording's frame stream.
- The ROM was read directly; the capture did not rebuild or patch it.
- Video is encoded with browser-compatible H.264 video and AAC audio, with fast-start metadata.

## Conversion details

The project adapts the SMB Vanilla native C gameplay reconstruction to V810 code. Original game data comes from the user-supplied disassembly and cartridge dump. The Virtual Boy platform backend handles VIP graphics, VSU audio, controller input and stereo depth.

The 256-pixel NES playfield is centered inside a 384-pixel Virtual Boy eye view. Eight lines of NES overscan are cropped at both top and bottom. Clouds, hills/bushes, gameplay geometry and HUD occupy different depth layers. The gameplay plane is shared by Mario, enemies, platforms and pipes so their rendered positions remain aligned with collisions.

V3 uses a hardware timer to keep gameplay advancing at approximately 60 updates per second when drawing misses frames. The backend uses inactive map banks and protects display swaps. The F/U overlay is part of the cartridge's own diagnostic display; it is left visible in the capture.

## Limits and attribution

This is a tool-assisted demonstration using emulator output, not human realtime input or a leaderboard submission. Taking the pipe shortcut omits a middle stretch of overworld scenery. The evidence proves World 1-1 completion only. The older 32-level verification established loading/rendering, not complete campaign playthroughs.

The supplied project notes say V3 still needs physical Virtual Boy confirmation. Audio uses VSU pulse/triangle/noise equivalents and does not exactly emulate NES APU percussion. Graphics are monochrome and overscan is cropped.

Game: Nintendo. Disassembly: doppelganger. C reconstruction: nukep and SMB Vanilla contributors. Hardware support: libgccvb and Team VUEngine. Emulator: Beetle VB/libretro; Windows launchers use Mednafen. See [CREDITS.md](CREDITS.md) for original source links and revisions. No rights are asserted over Nintendo's game or upstream components.
