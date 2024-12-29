# Random Words  

Get Random Words with Definition and Pronunciation.  

**Note**  

I primarily built this tool for personal use, and I mostly run it on my home server or localhost.This tool is not recommended for production use, this is for educational purpose , you are welcome to fork the project and make any changes as needed.  

## Setup

- Download or Clone the repo
- install dependencies

```sh
pnpm install
```

- Development

```sh
pnpm dev
```

- Build a Project

```sh
pnpm build
```

- Start the server

```sh
pnpm start
```

## Routes

- `/` - Static Page  
- `/words` - API to GET random words

## proxy API

Use this proxy API to bypass CF - **<https://github.com/mskian/bypass-cors>**  (Host this CORS API on Android Mobile using termux + Cloudflare Tunnel) ISP IP act as Proxy  

***Example `.env` Configuration***  

- Words Data from - <https://github.com/mcnaveen/Random-Words-API/blob/e60af96c0251f95860cf35f332b18634a02a87e6/routes/english.js#L6>  

```env
PROXY=https://cors.example.com/api/bypass?url=https://exampl.com.com/
URL=https://example.com/
PORT=6021
```

## About API

This API was Orginally Developed by [@mcnaveen](https://github.com/mcnaveen/)
I self-hosted this API.  

For More about this API - [Random Words API](https://github.com/mcnaveen/Random-Words-API)  

## Disclaimer ⚠

- We don't own any data or word. All belongs to the Respective owner of Website.
- Using it for educational purpose only.
- use it as your own risk  

## LICENSE

MIT
