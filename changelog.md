# NRG Changelog

## 0.2.4
* Throwing errors for: MissingItemTypeFlagException and unhandled errors.
* Various tweaks on messages.
* Refined output for missing filename item for interface from 'int' -> 'interface' only in case of interface-type.
* Changed `dotnetInterfaceStyle` from false -> true.
* Now the cli conf file is called `.energy.cli.json`.
* Fixed bug on mismatch between `nrg g --int` && `nrg g --interface`.
* Added test `should create the interface item correctly`.

## 0.2.3
* Intergrated readme with more info

## 0.2.2
* Fixed duplicate help output when issuing nrg with no cmds

## 0.2.1
* Described usage of init command in Readme

## 0.2.0
* Implemented init command

## 0.1.0
* First release