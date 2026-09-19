# Sources and acknowledgments

- **Super Mario Bros.** — Nintendo. Game data comes from the user's attached source and cartridge dump. This project is an unofficial personal port.
- **SMBDIS.ASM** — doppelganger. The original header, attribution, and comments remain in `source/original/SMBDIS.ASM`.
- **SMB Vanilla** — nukep and contributors, [repository](https://github.com/nukep/smb-vanilla-port), commit `87af9a388eb01093f99c2ac6a81238bce4d7158d`. The C gameplay reconstruction is adapted in `source/core/`. Changes include separating ROM from work RAM, removing SMB2J loading from the runtime, GCC 4.7 compatibility, sprite metadata, and native background rendering. The checked-out upstream revision has no standalone top-level license file; this package does not relabel its licensing.
- **libgccvb** — its authors and Team VUEngine, [repository](https://github.com/VUEngine/libgccvb), commit `5a37cd76397fd96eef8517fe28bdfcb9efe8a9bb`. Startup and linker files are adapted in `source/vb/`; the WRAM clear was changed to byte stores, and a stack-headroom assertion was added. Register definitions and hardware layout were cross-checked against libgccvb and the emulator source.
- **VBDE / gccVB** — [VUEngine/VBDE](https://github.com/VUEngine/VBDE), commit `6308f5c621713679d4dc96d3d60bc2232f5d280b`. The bundled V810 GCC 4.7.4 toolchain comes from that development environment. Original toolchain manuals and VBDE readme are retained in `toolchain/`.
- **py65 1.2.0** — Mike Naberezny and contributors, [repository](https://github.com/mnaberez/py65). Used only during asset assembly. BSD license retained in `tools/vendor/py65-LICENSE.txt`.
- **Mednafen 1.32.1** — Mednafen Team and contributors, [official release](https://mednafen.github.io/releases/), [corresponding source](https://mednafen.github.io/releases/files/mednafen-1.32.1.tar.xz). Original GPL license, documentation, and bundled dependency notices are in `emulator/`.
- **Beetle VB / libretro** — [repository](https://github.com/libretro/beetle-vb-libretro). Used for automated cycle-based cartridge tests. The test core is not required for normal play and is not bundled.

- Physical mirror-scan timing curve: libgccvb `source/video.c`, same upstream revision credited above; implemented in `display_timing.h`.
