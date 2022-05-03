import { NextResponse, NextRequest } from "next/server";

// import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  // Clone the request url
  const newReq = req.nextUrl.clone();

  // Get pathname of request (e.g. /blog-slug) CHANGED DUE TO CANARY VERSION TO WORK BOTH ON DEV AND PROD BUT IT USED TO BE:
  // const { pathname } = req.nextUrl;
  const pathname = req.nextUrl.pathname.toString();

  // Get hostname of request (e.g. demo.vercel.pub)
  const hostname = req.headers.get("host");


  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: "No hostname found in request headers"
    });

  const currentHost =
    // process.env.VERCEL_ENV === `production` && 
    process.env.VERCEL === `1`
      ? // You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
        // You can use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
        // in this case, our team slug is "platformize", thus *.platformize.vercel.app works
        hostname
          // .replace(`.lomplay.com`, "")
          .replace(`.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");
  
  console.log({currentHost, pathname})

  if (pathname.startsWith(`/_sites`))
    return new Response(null, {
      status: 404
    });

  if (pathname.startsWith(`/tickets`)) {
    console.log("4")
    return new Response(null, {
      status: 403
    });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    console.log("2")
    // if (currentHost === "localhost:3000") {
      console.log("3")
      // if (
      //   pathname === "/login" &&
      //   (req.cookies["next-auth.session-token"] ||
      //     req.cookies["__Secure-next-auth.session-token"])
      // ) {
      //   newReq.pathname = "/";
      //   return NextResponse.redirect(newReq.toString());
      // }

      newReq.pathname = `/tickets/`;
      console.log({_newReq: newReq.toString()})
      return NextResponse.rewrite(newReq.toString());
    // }

    // newReq.pathname = `/_sites/${currentHost}${pathname}`;
    // return NextResponse.rewrite(newReq.toString());
  }
}