# last-fm 
This  is the front-end assignment of label A a. The goal is to fetch data from your favorite artist using the last fm api and displaying it using the React framework.

## Time spend
Time spent: 8:02:49
I time manged using a Tool called Toggl

## Live Demo
[https://ramon96.github.io/fe-labela/](https://ramon96.github.io/fe-labela/)
the first album contains all the details

## installing the project
Clone the project
```Git clone https://github.com/Ramon96/fe-labela.git```

Navigate to the project using your terminal.
``` Cd fe-labela ``` 

Run the project
``` npm run start ```

## building the project
Use the folowwing command to build the project
``` npm run build ```

## Api
This project makes use of the last-fm api.
The api is used to retrieve data of given artist.

### Endpoints used
https://www.last.fm/api/show/artist.getTopAlbums
https://www.last.fm/api/show/album.getInfo

## Used packages
Webpack (for bundling)
Babel (for transpiling)
Eslint (code rules)
Styled components (css in js)

## Tools used
Visual studio code
Eslint (plugin)
vscode-styled-componetns (plugin)
Todo Tree (plugin)
React Developer toos (Chrome extension)

## Rescources used
[Setting up webpack + babel for react](https://www.valentinog.com/blog/babel/)\
I used this resource to set up this project. 


[styled components docs](https://styled-components.com/docs/api)
I used to resources to get an better understanding 

## Notes
I faced some problems with Async using babel
found the solution here:
https://github.com/babel/babel/issues/8829

At the time of developing this the Last.fm api is down:
https://twitter.com/lastfmstatus/status/1299278987148095488
I temporarly used themoviedb api as a placeholder

Couldn't find the year of an album when fetching the artist top albums.
I think it would be overkill to fetch 50 times just to display an release year when the album detail page already display's the year
(don't want hit an rate limit), so I chose to filter on playcount instead.

### Wishlist
- [x] Album overview page.
- [x] Album sorting by playcount and name (also descending ascending).
- [x] Album detail page.
- [x] Usage of styled components to style the components (css in js).
- [x] Filter by Search
- [x] Adding to favorites
- [ ] Removing from favorites (working on)
- [ ] favorites from every view
- [ ] Favorites page
- [ ] Adding Dotenv to the project.
- [ ] Finishing up Todo's
