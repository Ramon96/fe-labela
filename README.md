# last-fm 

This project was created using the [Create React App](https://github.com/facebook/create-react-app) command in the command tool.

# installing the project

# building the project

# Api
This project makes use of the last-fm api.
The api is used to retrieve data of given artist.

# Used packages
Wepack (for bundling)
Babel (for transpiling)
Eslint (code rules)
Styled components (css in js)

# Rescources used
[Setting up webpack + babel for react](https://www.valentinog.com/blog/babel/)
[styled components docs](https://styled-components.com/docs/api)


# Notes
I faced some problems with Async using babel
found the solution here:
https://github.com/babel/babel/issues/8829

At the time of developing this the Last.fm api is down:
https://twitter.com/lastfmstatus/status/1299278987148095488

I temporarly used themoviedb api as a placeholder

Couldn't find the year of an album when fetching the artist top albums.
I think it would be overkill to fetch 50 times just to display an release year when the album detail page already display's the year
(don't want hit an rate limit)