# Pedro blog Hugo Theme.

Simple and minimalist theme craft-made thinking on my personal blog requirements.

## Available Additional blog theme config

```toml
[Params]
    intro = true
    headline = "Latest Posts"
    description = "Hi! I’m a Front End Engineer with passion for Technology, Coding and Start ups. I Love Javascript and like to experiment and do good stuff with it"
    github = "https://github.com/luigi055"
    linkedin = "https://www.linkedin.com/in/pedro-la-rosa/"
    email = "pedrolarosad@gmail.com"
    dateFormat = "January 2, 2006"
    blogPhoto = "https://pedrolarosa.com/assets/pedro-photo.jpeg"
```

```toml
[[menu.nav]]
    name = "Categories"
    url = "/categories"
```

## Available Additional post/page config.

title = "string"
subtitle = "string"
description = "String"
date = 2021-12-06T00:00:00Z
author = "string"
categories = ["string", "string"]
shouldHideReadTime = boolean (false by default)
shouldHidePostTitleBox = boolean (false by default)
shouldHideShareButtons = boolean (false by default)
shouldHideAuthorCard = boolean (false by default)

### Cover image.

Want to add a cover image for your post?
convert your post into a folder and add a `cover.format` image

example:

```
- posts
--- my-awesome-post
----- cover.jpg
----- index.md
```

### raw html support

do you need to add custom html to your post use the {{< rawHTML >}} tag inside you md post
```{{< rawhtml >}} <h1>HTML</h1> {{< /rawhtml >}}````
