# Energy CLI ```WIP```

### The problem 
How much time do you spend on creating files, folders and classes for your projects? Nevertheless how much time takes you to scaffold your projects if you don't have an helper like Angular's CLI?

The last one, you could easily say that it's a ***"una tantum"*** time payment for your project. I don't agree with that 100% anyways.

The first one instead seem the less time consuming one, but you're wrong.

Let's say that you spend 10 seconds on creating a file. (the worst-case scenario)

+ create a folder that will contain all those new kinds of files (mkdir) 

+ create the file inside that folder (touch)

+ type the skeleton for that class in the newly created file

**10 seconds?** Maybe a bit too optimistic... 

Ah, and we are keeping apart any project specific naming conventions, so you also have to think a bit on how to name your file in a real world scenario. 

### The solution
Mostly every project that I've started so far, talking about frontend "JSish" stuff, has one thing in common. 

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

This structure is the most commonly used. And **Energy** works with this structure in mind. Every item you will generate through **Energy**, will be placed inside the **source** folder. This folder is customizable, and you can specify its path and name in the configuration. 

**Energy** can be initialized in practically any project, and is a good tool to have in your ***dev-dependencies*** while developing. 

**But you can see its advantages, just by using it.**

## Get started ```[demo-mode]```
Note that this package isn't fully ready yet. For this reason it's not yet publically available on the NPM repository. However if you'd like to try its features till now, feel free to follow these instructions. 

***Note:*** Some features may not work or be broken, this is not a stable version.

#### Clone the repository
```git clone https://www.github.com/caiuscitiriga/nrg-ngx-cli nrg```

#### CD into nrg and run an install
```
cd nrg
npm i
```

#### Now rebuild the dist folder
```
rm -r dist
npm run build
```

#### Once you've rebuilded, link the package locally
```
//  Windows
npm link

//  Unix
sudo npm link
```

This command will tell NPM to look in the dist folder at this location, whenever the user will run ```nrg``` in the terminal.

Now try to run ```nrg``` in the terminal, and the Help should come up. 

Sweet! You're ready to go.

## How to use it
You've got a list of commands that you can use. Some of these commands work with flags, some work without, others may work without flags, but faster with flags. 

Here are all the available commands:
+ new
+ set
+ init
+ help
+ generate


## **GENERATE**: 
**Usage**: ```nrg generate --flag:options```

**Aliases**: g

**Description**: 

Generates a new item.
 - The respective file will be namespaced by a [.item-type.extension] notation.
 - Also, the item-type will match a specific folder inside your source folder.
 - If the folder does not exists, it will be created.
 - During the process, Energy will try to guess the extension, if provided.
 - If the guess fails, you will be prompted for the extension. Type it, with no dots.

**Usage**:
You can simply run ```nrg g``` or ```nrg generate``` withouth any flag, and you will be prompted to type in the item type, and then the file name.

When you will type the file name, **Energy** will assume that the item you're creating will be placed inside the **source** folder. 

The item type, also tells **Energy** in which folder this item should go. So for example you're creating a DTO, the file will be placed inside ```source/dtos/your-file.dto.ts```

***Note: when you will pass the filename in, you can use these tricks in order to achieve different operations on the produced file:***

---
### New folders auto scaffold
If you want to place a new DTO inside a folder, or subfolder of a folder that doesn't exists yet, you can simply pass that folder structure before the filename, and those folders will be created for you.

```bash
#  This is how the whole filename typed in would look like
first-folder/second-folder/my-file.ts
``` 

---
### Naming convention
Energy uses a CamelCase notation to generate your class name from the filename. 

So if you want to achieve ```MySpecialClass``` as classname, your file has to be named ```my-special-class```

---
### Custom dot-notation namespacing on files
Any dot notation you will pass along with the filename until the extansion, will be interpreted like a 'namespacing' system. So, you can pass a filename like this `my-custom-file.namespaced.ts` and achieve a classname result like this: `MyCustomFileNamespaced`.

***Note: it's also worth to say that each item type generated, is automatically namespaced by Energy with its type namespace and followed by the extension. This namespaced doesn't influence your classname by default.***

If you want to add the default namespace to the generated classname, you can pass the name like this: `my-custom-file.namespaced.dto.ts`

In this way Energy will skip the auto add of the item-type namespace on the filename, and it will guess that you want to enforce that naming even on the classname. So you will get a classname with this name: `MyCustomFileNamespacedDto`.

 If you don't want this behaviour, just don't pass the default item type, and your classname won't be affected. While the file will follow the same standard name structure as the others.

 ---
 ### The short way: flagging system
 Let's take the worst scenario, where you want to create a DTO, inside a folders structure that doesn't exits yet, with a custom namespacing, without enforcing the default item-type namespacing on the classname, and with a TypeScript extension, with **one command**:

 ```
nrg g --dto:folder-one/folder-two/fake-response.custom.networking,ts
 ```

 This will produce a file with classname `FakeResponseCustomNetworking`, inside the ***source*** folder, under the ***dtos*** folder. In the newly created ***folder-one/folder-two*** directory.

The flag `--dto` tells Energy that you want to generate a DTO item type.

The `:` tells Energy that you want to pass some options, which will be the directory/filename and the extension for the item you want to create.

 ***Note: I've used a comma (,) to separate the name from the extension. This is because those are numbered indexes, and the comma is used by Energy to separate the informations.***

The same logic works with all the other item types.

## **The other commands are not yet implemented**
