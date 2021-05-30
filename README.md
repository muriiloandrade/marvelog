<h1 align="center">Welcome to Marvelog 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Marvelog is a application that work as a Marvel catalog where you can favorite your comics and characters from Marvel.

### Development stack
<div align="center"> 
  <img alt="NestJS" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="Angular" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
  <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
</div>

<br />
<div align="center">
  <h2><a href="https://marvelog.muriloandrade.dev/" target="_blank">✨ Demo link</a></h2>
</div>
  
## Dependencies
<div align="center">
  <img alt="Node.js" src="https://badges.aleen42.com/src/node.svg" /> or 
  <img alt="Docker" src="https://badges.aleen42.com/src/docker.svg" /> and
  <img alt="Visual Studio Code" src="https://badges.aleen42.com/src/visual_studio_code.svg" /> (or your preferred editor)
</div>

## Install
1. Fulfill a .env.dev file based on .env.example, then

> For Docker and Docker Compose users:

```sh
cd marvelog-server && npm run cs:local
```

> Running without Docker Compose:
1. Install both projects dependencies
```sh
npm ci
```
2. Do the following:
* For Backend:
```sh
cd marvelog-server && npm run start:localdebug
```
&nbsp;&nbsp;&nbsp;&nbsp;or (if you don't want to debug)
```sh
npm start
```

* For Frontend:
```sh
cd marvelog-client && npm
```

### Future features and improvements
- [ ] Search with Enter on the main page of character and comics
- [ ] Order the search on all pages
- [ ] Create a "forgot password" page
- [ ] Check if the last modified date from the returned data from Marvel's API is greater than the one in database and update the database record if so


## Author

👤 **Murilo Andrade**
<div align="center">
  <a href="https://t.me/muriloandrade" target="_blank" title="Telegram">
    <img alt="Telegram" src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" />
  </a>
  <a href="https://twitter.com/andrademuriilo" target="_blank" title="Twitter">
    <img alt="Twitter" src="https://img.shields.io/badge/@andrademuriilo-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white"/>
  </a>
  <a href="https://github.com/muriiloandrade" target="_blank" title="Github">
    <img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://linkedin.com/in/murilo--andrade" target="_blank" title="Linkedin">
    <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</div>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/muriiloandrade/marvelog/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## License

Licensed under the [MIT license](LICENSE)