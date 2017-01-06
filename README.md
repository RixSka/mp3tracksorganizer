# MP3tracksOrganizer

>Have you got an elevated number of mp3 tracks in a single folder?
You want them organized on many folders probably by album name.
But you don't want manually separate them, right?
Here you are a simple script that will separate your tracks by album reading id3 tags and creating folders using the "%year - %album" (or "%album" if year is unavailable) and moving them in.

### Requirements

[NodeJS](https://nodejs.org/en/download/)

### HOW TO
- Download script + modules here (or clone repo)
- Run on cmd / bash from script folder (assuming nodejs is available through environment variable):
```
node mp3tracksorganizer /path/of/files
```

### MODULES
I used some modules under [MIT](http://spdx.org/licenses/MIT) license specified on package.json. 
Here you are a list with related npmjs link:

- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [mv](https://www.npmjs.com/package/mv)
- [node-id3](https://www.npmjs.com/package/node-id3)

If you downloaded only script + package.json, you can run:
```
npm install
```
This will install missing dependencies.

### LICENSE
[MIT](https://github.com/RixSka/mp3tracksorganizer/blob/master/LICENSE)

