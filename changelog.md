# NRG Changelog

## 0.2.4 - Aelene
* Throwing errors for: MissingItemTypeFlagException and unhandled errors.
* Various tweaks on messages.
* Refined output for missing filename item for interface from 'int' -> 'interface' only in case of interface-type.
* Changed `dotnetInterfaceStyle` from false -> true.
* Now the cli conf file is called `.energy.cli.json`.
* Fixed bug on mismatch between `nrg g --int` && `nrg g --interface`.
* Added test `should create the interface item correctly`.