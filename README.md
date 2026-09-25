# eatOS-com

Lets import https://s.eatos.dev the full website with all pages

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://eatos.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b675eaf0-f678-4036-aa59-3142eda6c8f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `lovable` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Public chat widgets

Public chat is selected at runtime by the browser hostname:

- `s.eatos.dev` loads Maya (`AgentAssistant`) and never loads Crisp.
- `eatos.com` and `www.eatos.com` load Crisp and never mount Maya.
- Other hostnames, including local and preview hosts, load neither widget.

Set `NEXT_PUBLIC_CRISP_WEBSITE_ID=cf9ee4db-97df-4864-8fa6-194ad4762b95`
for Worker builds. `CRISP_WEBSITE_ID` is also accepted by the server layout.
The confirmed production website ID is retained as a fallback, but it is only
used after the runtime hostname matches one of the two live domains.
