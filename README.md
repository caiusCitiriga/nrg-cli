# Energy CLI ```WIP```

### The problem 
How much time do you spend on creating files, folders and classes for your projects? Nevertheless how much time takes you to scaffold your projects if you don't have an helper like Angular's CLI?

Let's say that you spend 10 seconds on creating a file. (the worst-case scenario)

+ create a folder that will contain all those new kinds of files (mkdir) 

+ create the file inside that folder (touch)

+ type the skeleton for that class in the newly created file

**10 seconds?** Maybe a bit too optimistic... 

Ah, and we are keeping apart any project specific naming conventions, so you also have to think a bit on how to name your file in a real world scenario. 

Now multiply that ***10s timespan*** for each item you will create... 

### The solution
Mostly every project that I've started so far, talking about frontend "JSish" stuff, have one thing in common:

You will use DTOs, Interfaces, Enums, Config files, maybe CONSTs files and so on. 

 ***Wouldn't be great having someone that takes care of that for you in a split second standardizing the whole process, yet giving you the ability to make some exceptions for custom scenarios?***

### Introducing NRG CLI
**Energy** aims to solve this problem, by standardizing your project structure into something like this:

```
source/
    dtos/
    enums/
    cores/
    consts/
    customs/
    entities/
    services/
    interfaces/
    ...
```

This structure is the most commonly used. But is fully customizable, don't worry. Every item you will generate through **Energy**, will be placed inside the **source** folder. This folder is customizable too, and you can specify its path and name in the configuration, just like for anything else. 

**Energy** can be initialized in practically any project, and is a good tool to have in your ***dev-dependencies*** while developing. 

## Features
* Fully customizable behaviour and structure.
* Most commonly used item types are built in. 
* Allows you to add custom additional item types.
* Folders auto scaffolding during an item generation.
* [NOT AVAILABLE YET] Configurable NPM package auto init.
* [NOT AVAILABLE YET] Configurable Git repository auto init.

## Get started ```[demo-mode]```
***Note:*** Some features may not work or be broken, this is not a stable version.

```bash
#  Install Energy
npm i nrg-cli -g

#  Test if it works
nrg
```

## **GENERATE**: 
**Usage**: ```nrg g --item=filename```

**Description**: 

Generates a new item.
 - The respective file will be namespaced by a [.item-type.extension] notation.
 - Also, the item-type will match a specific folder inside your source folder.
 - If the folder does not exists, it will be created. The same is true for folders specified before the filename. ***Note that those folders needs to be separated using the Unix `/` separator***
 - The extension used will be the one specified in the cli configuration

**Example**:
